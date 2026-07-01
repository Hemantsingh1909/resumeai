# ATSPrime

Your resume's AI copilot. ATSPrime analyzes your resume against a job description and helps you tailor it to pass Applicant Tracking Systems (ATS) and stand out to recruiters.

**Live site:** [atsprime.in](https://atsprime.in)

## What it does

- Upload your resume and paste a job description
- Get an ATS compatibility score and keyword match analysis
- Receive AI-powered suggestions to tailor your resume for the specific role
- Export a polished, job-specific version of your resume as a PDF

## Tech Stack

- **Frontend & Framework:** Next.js, TypeScript
- **Backend/AI Logic:** Python
- **AI Integration:** [TODO: confirm — OpenAI API?]
- **Error Monitoring:** Sentry
- **Testing:** Playwright (end-to-end tests)
- **Deployment:** Vercel

## Getting Started

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

### Environment Variables

Create a `.env.local` file with the required keys:

```
[TODO: list actual env vars — AI API key, Sentry DSN, etc.]
```

## Running Tests

This project uses Playwright for end-to-end testing:

```bash
npx playwright test
```

## Why I built this

Job hunting means tailoring dozens of resumes to match specific job descriptions — a slow, repetitive process. ATSPrime automates that tailoring while keeping the output honest and accurate to the user's real experience, rather than fabricating skills or inflating claims.

## Contact

Built by Hemant Satwal — [hemantingh1909@gmail.com](mailto:hemantingh1909@gmail.com) · [LinkedIn](https://www.linkedin.com/in/hemantsatwal/) · [Portfolio](https://hemantsatwal.in)
