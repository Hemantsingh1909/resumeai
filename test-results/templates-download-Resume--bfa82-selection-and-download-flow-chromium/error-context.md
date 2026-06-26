# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: templates-download.spec.ts >> Resume template selection and download flow
- Location: tests/templates-download.spec.ts:3:5

# Error details

```
TimeoutError: page.waitForSelector: Timeout 60000ms exceeded.
Call log:
  - waiting for locator('text=Tailored Resume Ready.') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "ATSPrime SANDBOX" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e7]
          - generic [ref=e10]: ATSPrime
          - generic [ref=e11]: SANDBOX
        - generic [ref=e12]:
          - generic [ref=e13]: 01. Upload
          - img [ref=e14]
          - generic [ref=e16]: 02. Job Description
          - img [ref=e17]
          - generic [ref=e19]: 03. Analysis
          - img [ref=e20]
          - generic [ref=e22]: 04. Results
        - button "u user_9z9exzuus" [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: u
          - generic [ref=e27]: user_9z9exzuus
          - img [ref=e28]
    - main [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: STEP 02
          - heading "Paste the Target Job." [level=1] [ref=e33]
          - paragraph [ref=e34]: Paste the job posting to align your keywords, impact metrics, and skills dynamically.
        - generic [ref=e35]:
          - generic [ref=e36]:
            - generic [ref=e37]:
              - img [ref=e38]
              - generic [ref=e42]: "Active Resume:"
              - generic [ref=e43]: Alex_Rivera_Frontend_Engineer.pdf
            - button "Change" [ref=e44] [cursor=pointer]:
              - img [ref=e45]
              - text: Change
          - generic [ref=e50]:
            - generic [ref=e51]: "You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. * Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-2.5-flash Please retry in 27.616100405s."
            - button "✕" [ref=e52] [cursor=pointer]
          - generic [ref=e53]:
            - generic [ref=e54]:
              - img [ref=e55]
              - generic [ref=e58]: Target Job Description
            - button "Load Sample Job" [ref=e59] [cursor=pointer]:
              - img [ref=e60]
              - text: Load Sample Job
          - textbox "Paste the job requirements, responsibilities, or description here..." [ref=e62]: "Senior Frontend Engineer (React / Next.js) We are looking for a Senior Frontend Engineer to build high-performance web applications. You will collaborate with product designers and backend engineers to craft beautiful, responsive developer tooling interfaces. Key Requirements: - 3+ years experience building production apps with React, TypeScript, and Tailwind CSS. - Deep understanding of web performance optimization and Core Web Vitals (LCP, CLS, INP). - Excellent collaboration skills for defining RESTful or GraphQL API contracts. - Experience with server-side rendering, Next.js, and page-load optimizations. - Passion for visual polish, accessibility (a11y), and motion design."
          - generic [ref=e63]:
            - button "Go Back" [ref=e64] [cursor=pointer]
            - button "Optimize & Tailor Resume" [ref=e65] [cursor=pointer]:
              - text: Optimize & Tailor Resume
              - img [ref=e66]
    - contentinfo [ref=e68]:
      - generic [ref=e69]:
        - paragraph [ref=e70]: © 2026 ATSPrime Sandbox. All rights reserved.
        - link "Home" [ref=e72] [cursor=pointer]:
          - /url: /
  - generic [ref=e77] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e78]:
      - img [ref=e79]
    - generic [ref=e82]:
      - button "Open issues overlay" [ref=e83]:
        - generic [ref=e84]:
          - generic [ref=e85]: "0"
          - generic [ref=e86]: "1"
        - generic [ref=e87]: Issue
      - button "Collapse issues badge" [ref=e88]:
        - img [ref=e89]
  - alert [ref=e91]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Resume template selection and download flow", async ({ page }) => {
  4  |   test.setTimeout(90000);
  5  |   // 1. Navigate to dashboard page
  6  |   await page.goto("http://localhost:3000/dashboard");
  7  |   await page.waitForLoadState("networkidle");
  8  | 
  9  |   // 2. We should see the auth modal. Sign up with a random email to ensure a fresh session.
  10 |   const randomEmail = `user_${Math.random().toString(36).substring(2, 11)}@dev.io`;
  11 |   
  12 |   await page.fill('input[type="email"]', randomEmail);
  13 |   await page.fill('input[type="password"]', "Password123");
  14 |   await page.click('button[type="submit"]');
  15 | 
  16 |   // Wait for the auth transition to finish and see STEP 01
  17 |   await page.waitForSelector("text=STEP 01", { timeout: 5000 });
  18 |   await expect(page.locator("text=Upload your base resume.")).toBeVisible();
  19 | 
  20 |   // 3. Click Use Sample Resume
  21 |   await page.click('button:has-text("Use Sample Resume")');
  22 |   
  23 |   // Verify sample file loaded
  24 |   await expect(page.locator("text=Alex_Rivera_Frontend_Engineer.pdf")).toBeVisible();
  25 | 
  26 |   // 4. Click Continue to Job Description
  27 |   await page.click('button:has-text("Continue to Job Description")');
  28 | 
  29 |   // Verify we are at STEP 02
  30 |   await page.waitForSelector("text=STEP 02", { timeout: 5000 });
  31 |   await expect(page.locator("text=Paste the Target Job.")).toBeVisible();
  32 | 
  33 |   // 5. Load Sample Job
  34 |   await page.click('button:has-text("Load Sample Job")');
  35 | 
  36 |   // Verify text area is populated
  37 |   const jobText = await page.locator("textarea").inputValue();
  38 |   expect(jobText).toContain("Senior Frontend Engineer");
  39 | 
  40 |   // 6. Click Optimize & Tailor Resume
  41 |   await page.click('button:has-text("Optimize & Tailor Resume")');
  42 | 
  43 |   // Verify STEP 03 analysis starts
  44 |   await page.waitForSelector("text=TAILORING ENGINE", { timeout: 5000 });
  45 |   
  46 |   // 7. Wait for step 4 Results (timeout 60 seconds to allow mock progress + API call to finish)
  47 |   // Note: the mock uses process.env.GEMINI_API_KEY, but since the test runs against the local server, 
  48 |   // we wait for it to return candidates or fallback.
> 49 |   await page.waitForSelector("text=Tailored Resume Ready.", { timeout: 60000 });
     |              ^ TimeoutError: page.waitForSelector: Timeout 60000ms exceeded.
  50 |   
  51 |   // Verify ATS Score is displayed
  52 |   await expect(page.locator("text=ATS Match Score Comparison")).toBeVisible();
  53 | 
  54 |   // 8. Open inline Template Selection Tab by clicking the header button
  55 |   await page.click('button:has-text("Download PDF / Preview")');
  56 | 
  57 |   // Verify the visual layout preview container is visible
  58 |   await page.waitForSelector("text=Visual Layout Preview", { timeout: 5000 });
  59 |   await expect(page.locator("text=Visual Layout Preview")).toBeVisible();
  60 | 
  61 |   // 9. Verify the preview iframe is visible
  62 |   const previewIframe = page.locator("#resume-preview-iframe");
  63 |   await expect(previewIframe).toBeVisible();
  64 | 
  65 |   // 10. Verify all 6 templates are rendered in the sidebar list
  66 |   const templates = [
  67 |     "Classic Harvard",
  68 |     "Modern Tech",
  69 |     "Elegant Minimalist",
  70 |     "Split Sidebar",
  71 |     "Creative Slate",
  72 |     "Executive Bold"
  73 |   ];
  74 |   for (const tpl of templates) {
  75 |     await expect(page.locator(`text=${tpl}`)).toBeVisible();
  76 |   }
  77 | 
  78 |   // 11. Select 'Modern Tech' template
  79 |   await page.click('text=Modern Tech');
  80 |   
  81 |   // 12. Trigger PDF download and capture it (button text is "Download PDF" inside the tab view)
  82 |   const [downloadPdf] = await Promise.all([
  83 |     page.waitForEvent("download"),
  84 |     page.getByRole("button", { name: "Download PDF", exact: true }).click()
  85 |   ]);
  86 | 
  87 |   const pdfFilename = downloadPdf.suggestedFilename();
  88 |   expect(pdfFilename).toContain("Modern");
  89 |   expect(pdfFilename.endsWith(".pdf")).toBe(true);
  90 | 
  91 |   // 13. Verify the inline view remains visible upon successful download
  92 |   await expect(page.locator("text=Visual Layout Preview")).toBeVisible();
  93 | });
  94 | 
```