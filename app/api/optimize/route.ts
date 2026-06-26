import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription, uploadedFileBase64 } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json(
        { error: { message: "GEMINI_API_KEY is not configured on the server. Please check your .env.local configuration." } },
        { status: 500 }
      );
    }

    // 1. Extract PDF text if a PDF file is provided
    let activeResumeText = resumeText;
    if (uploadedFileBase64) {
      try {
        const pdf = require("pdf-parse");
        const pdfBuffer = Buffer.from(uploadedFileBase64, "base64");
        const pdfData = await pdf(pdfBuffer);
        activeResumeText = pdfData.text;
      } catch (err: any) {
        console.error("Error extracting text from PDF resume:", err);
        return NextResponse.json(
          { error: { message: `Failed to extract text from PDF resume: ${err.message}` } },
          { status: 400 }
        );
      }
    }

    if (!activeResumeText || !activeResumeText.trim()) {
      return NextResponse.json(
        { error: { message: "Resume content is empty. Please upload a valid resume." } },
        { status: 400 }
      );
    }

    // 2. Shorten prompt text to save token overhead, leveraging responseSchema for structure
    const promptText = `Analyze the provided Resume and Job Description.
Tailor the resume text (summaries, experience bullets, skills) to align with the job description.
Extract and return the original plain text of the resume.
Calculate original vs optimized ATS scores, identify matched keywords, AI-optimized keywords inserted, and provide bullet diffs.

Resume Text:
"""
${activeResumeText}
"""

Job Description:
"""
${jobDescription}
"""

Return the analysis response as a single JSON object matching the provided responseSchema.`;

    const systemInstructionText = `You are the AI engine behind ATSPrime, an AI-powered ATS resume optimization platform. Your task is to analyze resumes against a target job description, improve ATS compatibility, preserve factual accuracy, quantify achievements where possible, optimize keywords naturally, and produce recruiter-friendly, truthful content. Never invent experience or skills. Maintain professional formatting and concise, impactful bullet points.`;

    // 3 & 4. Use the v1beta endpoint (needed for gemini-2.5-flash schemas) and implement retry logic for HTTP 429
    const callGemini = async (attempt = 1): Promise<Response> => {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptText }]
              }
            ],
            systemInstruction: {
              parts: [
                {
                  text: systemInstructionText
                }
              ]
            },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  tailoredResumeText: { type: "STRING" },
                  originalResumeText: { type: "STRING" },
                  originalAtsScore: { type: "INTEGER" },
                  optimizedAtsScore: { type: "INTEGER" },
                  matchedKeywords: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  insertedKeywords: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  bulletDiffs: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        original: { type: "STRING" },
                        tailored: { type: "STRING" },
                        improvements: {
                          type: "ARRAY",
                          items: { type: "STRING" }
                        }
                      },
                      required: ["original", "tailored", "improvements"]
                    }
                  }
                },
                required: [
                  "tailoredResumeText",
                  "originalResumeText",
                  "originalAtsScore",
                  "optimizedAtsScore",
                  "matchedKeywords",
                  "insertedKeywords",
                  "bulletDiffs"
                ]
              }
            }
          })
        }
      );

      if (res.status === 429 && attempt <= 2) {
        let waitMs = 5000;
        const retryAfterHeader = res.headers.get("retry-after");
        if (retryAfterHeader) {
          const retryAfterSec = parseInt(retryAfterHeader, 10);
          if (!isNaN(retryAfterSec)) {
            waitMs = retryAfterSec * 1000;
          } else {
            const retryDate = Date.parse(retryAfterHeader);
            if (!isNaN(retryDate)) {
              waitMs = Math.max(0, retryDate - Date.now());
            }
          }
        }
        console.warn(`Gemini API returned 429. Retrying in ${waitMs}ms (attempt ${attempt})...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        return callGemini(attempt + 1);
      }

      return res;
    };

    const response = await callGemini();

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: { message: errData.error?.message || `HTTP error ${response.status}` } },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API route optimization error:", err);
    return NextResponse.json(
      { error: { message: err.message || "An unexpected error occurred." } },
      { status: 500 }
    );
  }
}
