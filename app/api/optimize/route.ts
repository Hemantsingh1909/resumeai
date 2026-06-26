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

    let parts: any[] = [];

    if (uploadedFileBase64) {
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: uploadedFileBase64
        }
      });
      
      parts.push({
        text: `Analyze the attached Resume PDF document and the provided Job Description, and output a tailored, optimized resume, the extracted original plain text, and bullet point analysis in valid JSON format.

Job Description:
"""
${jobDescription}
"""

Your response must be a single, valid JSON object matching the following structure. Do not output any markdown formatting, code block backticks, or extra commentary. Just the raw JSON content:
{
  "tailoredResumeText": "The complete tailored resume text including optimized headers, summaries, work experience (with rewritten bullet points), skills section, and education. Ensure it is formatted cleanly in plain text.",
  "originalResumeText": "The plain text extracted from the uploaded resume PDF file.",
  "originalAtsScore": 72,
  "optimizedAtsScore": 95,
  "matchedKeywords": ["React", "TypeScript", "Tailwind CSS"],
  "insertedKeywords": ["Next.js", "Core Web Vitals", "a11y"],
  "bulletDiffs": [
    {
      "original": "The original bullet point from the resume that needed optimization",
      "tailored": "The optimized and rewritten bullet point",
      "improvements": ["Improvement explanation 1", "Improvement explanation 2"]
    }
  ]
}

Perform actual analysis on the provided inputs to populate these fields. Ensure all JSON strings are properly escaped. Return only valid JSON.`
      });
    } else {
      parts.push({
        text: `Analyze the provided Resume and Job Description, and output a tailored, optimized resume, the original plain text, and bullet point analysis in valid JSON format.

Resume Text:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

Your response must be a single, valid JSON object matching the following structure. Do not output any markdown formatting, code block backticks, or extra commentary. Just the raw JSON content:
{
  "tailoredResumeText": "The complete tailored resume text including optimized headers, summaries, work experience (with rewritten bullet points), skills section, and education. Ensure it is formatted cleanly in plain text.",
  "originalResumeText": "The plain text of the provided resume text.",
  "originalAtsScore": 72,
  "optimizedAtsScore": 95,
  "matchedKeywords": ["React", "TypeScript", "Tailwind CSS"],
  "insertedKeywords": ["Next.js", "Core Web Vitals", "a11y"],
  "bulletDiffs": [
    {
      "original": "The original bullet point from the resume that needed optimization",
      "tailored": "The optimized and rewritten bullet point",
      "improvements": ["Improvement explanation 1", "Improvement explanation 2"]
    }
  ]
}

Perform actual analysis on the provided inputs to populate these fields. Ensure all JSON strings are properly escaped. Return only valid JSON.`
      });
    }

    const systemInstructionText = `You are the AI engine behind ATSPrime, an AI-powered ATS resume optimization platform. Your task is to analyze resumes against a target job description, improve ATS compatibility, preserve factual accuracy, quantify achievements where possible, optimize keywords naturally, and produce recruiter-friendly, truthful content. Never invent experience or skills. Maintain professional formatting and concise, impactful bullet points.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: parts
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
            responseMimeType: "application/json"
          }
        })
      }
    );

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
