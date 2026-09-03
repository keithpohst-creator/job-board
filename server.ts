import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Lazy initialize GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Gemini initialization skipped or failed:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // API Route: AI Job ↔ CV Match Evaluation
  app.post('/api/match-job', async (req, res) => {
    const { candidateProfile, job } = req.body;
    if (!candidateProfile || !job) {
      return res.status(400).json({ error: 'Missing candidateProfile or job payload' });
    }

    const ai = getAI();
    if (ai) {
      try {
        const prompt = `You are a world-class executive talent recruiter and AI career coach at AscentJobs.
Evaluate the candidate's CV/Profile against the Job Description.

Candidate:
- Name: ${candidateProfile.name || 'Candidate'}
- Current Title: ${candidateProfile.title || 'Professional'}
- Summary: ${candidateProfile.summary || ''}
- Key Skills: ${(candidateProfile.skills || []).join(', ')}
- Experience: ${JSON.stringify(candidateProfile.experience || [])}
- Education & Certifications: ${(candidateProfile.certifications || []).concat(candidateProfile.education || []).join(', ')}

Job:
- Title: ${job.title}
- Company: ${job.company}
- Location: ${job.location} (${job.workModel})
- Industry: ${job.industry}
- Salary: $${job.salaryMin?.toLocaleString()} - $${job.salaryMax?.toLocaleString()}
- Key Requirements / Skills: ${(job.requiredSkills || []).join(', ')}
- Description: ${job.description}

Analyze the match and return valid JSON with:
1. "score": number between 30 and 99 (overall percentage fit)
2. "matchLabel": "Strong Match" | "Good Match" | "Moderate Match" | "Growth Opportunity"
3. "goodFitReasons": array of 3 to 4 specific bullet points explaining why this is a good fit (highlighting matching skills, years of experience, relevant domain achievements, etc.)
4. "notGoodFitReasons": array of 2 to 3 constructive bullet points highlighting why it may NOT be a good fit (skills gaps, seniority mismatch, location/work model differences, or strict domain requirements)
5. "skillsGap": array of objects with:
   - "skill": name of missing or under-represented skill
   - "importance": "High" | "Medium" | "Nice-to-have"
   - "recommendation": brief tip on how candidate can address it
6. "recommendedCertifications": array of 2-3 specific recognized certifications or training courses that would bridge these gaps for this role (with "name", "provider", "estimatedDuration", "expectedMatchBoostPercent").

Respond ONLY with raw valid JSON, no markdown code block fences.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const text = response.text || '{}';
        const parsed = JSON.parse(text);
        return res.json({ source: 'gemini', ...parsed });
      } catch (err: any) {
        console.error('Gemini match error, falling back to heuristic:', err?.message || err);
      }
    }

    // Heuristic Fallback
    const candidateSkills = (candidateProfile.skills || []).map((s: string) => s.toLowerCase());
    const jobSkills = (job.requiredSkills || []).map((s: string) => s.toLowerCase());
    const matched = jobSkills.filter((js: string) => candidateSkills.some((cs: string) => cs.includes(js) || js.includes(cs)));
    const missing = jobSkills.filter((js: string) => !matched.includes(js));

    const ratio = jobSkills.length > 0 ? matched.length / jobSkills.length : 0.75;
    const baseScore = Math.min(96, Math.max(50, Math.round(55 + ratio * 40)));

    const goodFitReasons = [
      `Strong alignment in core competencies: ${matched.slice(0, 3).map((s: string) => s.toUpperCase()).join(', ')}.`,
      `Candidate background in ${candidateProfile.title || 'relevant field'} matches role seniority and scope.`,
      `Target compensation and preferred work model (${job.workModel}) match candidate criteria.`
    ];

    const notGoodFitReasons = missing.length > 0
      ? [
          `Lacks documented experience with: ${missing.slice(0, 2).map((s: string) => s.toUpperCase()).join(', ')}.`,
          `Role expects specialized domain expertise that may require a ramp-up period.`
        ]
      : [
          `High competition for this tier; requires distinctive portfolio evidence.`,
          `Fast-paced release cycles may demand more hands-on execution than leadership.`
        ];

    const skillsGap = missing.slice(0, 3).map((skill: string) => ({
      skill: skill.toUpperCase(),
      importance: 'High',
      recommendation: `Pursue coursework or practical side projects implementing ${skill.toUpperCase()}.`
    }));

    const recommendedCertifications = [
      {
        name: 'Enterprise AI & Cloud Systems Specialization',
        provider: 'Google Cloud & DeepLearning.AI',
        estimatedDuration: '4-6 weeks',
        expectedMatchBoostPercent: 12
      },
      {
        name: 'Advanced Product & Tech Leadership Certificate',
        provider: 'Stanford Online / Pragmatic Institute',
        estimatedDuration: '3 weeks',
        expectedMatchBoostPercent: 8
      }
    ];

    return res.json({
      source: 'heuristic',
      score: baseScore,
      matchLabel: baseScore >= 85 ? 'Strong Match' : baseScore >= 70 ? 'Good Match' : 'Moderate Match',
      goodFitReasons,
      notGoodFitReasons,
      skillsGap,
      recommendedCertifications
    });
  });

  // API Route: Parse CV / LinkedIn Text
  app.post('/api/parse-cv', async (req, res) => {
    const { cvText, linkedinUrl } = req.body;
    const ai = getAI();

    if (ai && (cvText || linkedinUrl)) {
      try {
        const prompt = `You are an AI resume parser for AscentJobs.
Extract structured professional profile information from this input:
Input type: ${linkedinUrl ? `LinkedIn Profile URL: ${linkedinUrl}` : 'CV Text'}
Raw Content:
${cvText || 'No text provided, extract realistic profile based on LinkedIn URL format'}

Return valid JSON with:
1. "name": string
2. "title": string (current professional headline)
3. "summary": string (2-3 sentences overview)
4. "skills": string[] (10-15 key skills)
5. "experience": array of { "title": string, "company": string, "period": string, "highlights": string[] }
6. "education": string[]
7. "certifications": string[]
8. "preferredIndustries": string[]
9. "targetSalaryMin": number
10. "targetSalaryMax": number

Respond ONLY with raw JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({ source: 'gemini', profile: parsed });
      } catch (err: any) {
        console.error('Gemini parse error, falling back:', err?.message);
      }
    }

    // Default parsed profile
    return res.json({
      source: 'mock',
      profile: {
        name: 'Sarah Chen',
        title: 'Senior Product Manager & AI Systems Lead',
        summary: 'Accomplished product leader with 7+ years directing cross-functional teams, launching enterprise SaaS platforms, and operationalizing generative AI workflows. Adept at transforming complex customer needs into high-growth software products.',
        skills: [
          'Product Strategy',
          'AI / GenAI Integration',
          'Agile & Scrum (CSPO)',
          'Roadmapping',
          'User Research & UX',
          'Cross-Functional Leadership',
          'SaaS Metrics (ARR, CAC, LTV)',
          'SQL & Data Analytics',
          'API Architecture',
          'Cloud Computing (AWS/GCP)',
          'Stakeholder Management'
        ],
        experience: [
          {
            title: 'Lead Product Manager - AI & Platform',
            company: 'Synthetix Solutions',
            period: '2022 - Present',
            highlights: [
              'Spearheaded the flagship AI assistant product resulting in $8.4M ARR in first 14 months.',
              'Managed team of 14 engineers, 2 UX designers, and 3 data scientists across 3 timezones.',
              'Improved candidate matching conversion efficiency by 38% through LLM-driven ranking.'
            ]
          },
          {
            title: 'Senior Product Manager',
            company: 'Apex Cloud Networks',
            period: '2019 - 2022',
            highlights: [
              'Delivered scalable multi-tenant SaaS infrastructure serving 120k+ daily active users.',
              'Increased user retention by 24% via self-service telemetry analytics.'
            ]
          }
        ],
        education: ['B.S. in Computer Science & Cognitive Systems, UC Berkeley'],
        certifications: ['Certified Scrum Product Owner (CSPO)', 'AWS Certified Cloud Practitioner'],
        preferredIndustries: ['Technology & SaaS', 'Enterprise AI', 'FinTech & Payments'],
        targetSalaryMin: 165000,
        targetSalaryMax: 210000
      }
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AscentJobs server listening on port ${PORT}`);
  });
}

startServer();
