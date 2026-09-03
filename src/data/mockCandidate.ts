import { CandidateProfile, RecommendedCert } from '../types';

export const initialCandidateProfile: CandidateProfile = {
  name: 'Sarah Chen',
  title: 'Senior Product Manager & AI Systems Lead',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  location: 'San Francisco, CA (Open to Remote)',
  targetSalaryMin: 175000,
  targetSalaryMax: 225000,
  preferredWorkModel: 'Hybrid',
  linkedinUrl: 'https://www.linkedin.com/in/sarah-chen-product-lead',
  cvFileName: 'Sarah_Chen_Senior_Product_Lead_CV.pdf',
  cvSource: 'local',
  cvLastUpdated: 'Today at 09:14 AM',
  summary: 'Accomplished product leader with 7+ years directing cross-functional teams, shipping enterprise SaaS platforms, and deploying generative AI capabilities. Proven track record scaling ARR from $2M to $18M with customer-obsessed execution.',
  skills: [
    'Product Strategy',
    'AI & GenAI Solutions',
    'Agile & Scrum (CSPO)',
    'Roadmap Prioritization',
    'Enterprise SaaS Metrics',
    'Cross-Functional Leadership',
    'User Experience (UX) Research',
    'SQL & Product Analytics',
    'API Architecture',
    'Cloud Systems (AWS / GCP)',
    'Stakeholder Management',
    'Go-to-Market Strategy'
  ],
  experience: [
    {
      title: 'Lead Product Manager - AI & Platform',
      company: 'Synthetix AI Solutions',
      period: '2022 - Present · 3 yrs',
      highlights: [
        'Spearheaded enterprise GenAI workflow suite, generating $8.4M incremental ARR within 14 months of launch.',
        'Led sprint planning and discovery for 14 software engineers, 2 machine learning researchers, and 2 product designers.',
        'Instituted automated telemetry and feedback loops, increasing user retention by 28%.'
      ]
    },
    {
      title: 'Senior Product Manager',
      company: 'Apex Cloud Networks',
      period: '2019 - 2022 · 3 yrs',
      highlights: [
        'Owned core microservices billing and IAM infrastructure for 150,000+ business accounts.',
        'Reduced enterprise customer onboarding cycle time from 21 days down to 4 days.'
      ]
    },
    {
      title: 'Product Manager',
      company: 'VentureLoop Labs',
      period: '2017 - 2019 · 2 yrs',
      highlights: [
        'Conducted over 120 customer discovery interviews for B2B analytics dashboard.',
        'Collaborated with sales and marketing teams to establish self-serve onboarding funnel.'
      ]
    }
  ],
  education: [
    'B.S. in Computer Science & Cognitive Sciences, UC Berkeley (Magna Cum Laude)'
  ],
  certifications: [
    'Certified Scrum Product Owner (CSPO) — Scrum Alliance',
    'AWS Certified Cloud Practitioner — Amazon Web Services'
  ],
  completedCourseIds: []
};

export const masterUpskillingCatalog: RecommendedCert[] = [
  {
    id: 'cert-aws-solutions-arch',
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'Amazon Web Services',
    estimatedDuration: '6-8 weeks (45 hours)',
    cost: '$150 USD',
    expectedMatchBoostPercent: 12,
    skillsAddressed: ['Cloud Architecture', 'Distributed Systems', 'Security & IAM', 'AWS Infrastructure'],
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  },
  {
    id: 'cert-stanford-ai',
    name: 'Generative AI & LLM Systems for Enterprise',
    provider: 'Stanford Center for Professional Development',
    estimatedDuration: '4 weeks (30 hours)',
    cost: 'Sponsored / $495',
    expectedMatchBoostPercent: 15,
    skillsAddressed: ['LLM Orchestration', 'RAG Architectures', 'Model Evaluation & Safety', 'AI Governance'],
    url: 'https://online.stanford.edu/'
  },
  {
    id: 'cert-pragmatic-pm',
    name: 'PMC-III Product Master Certification',
    provider: 'Pragmatic Institute',
    estimatedDuration: '3 weeks (24 hours)',
    cost: '$1,295 USD',
    expectedMatchBoostPercent: 9,
    skillsAddressed: ['Market Validation', 'Product Pricing Strategy', 'Executive Business Case Formulation'],
    url: 'https://www.pragmaticinstitute.com/'
  },
  {
    id: 'cert-fintech-compliance',
    name: 'FinTech Regulations & Global Compliance (AML/KYC)',
    provider: 'Harvard Online & FinTech Association',
    estimatedDuration: '5 weeks (35 hours)',
    cost: '$850 USD',
    expectedMatchBoostPercent: 14,
    skillsAddressed: ['FinTech Regulations', 'PCI-DSS Compliance', 'AML/KYC Flows', 'Banking-as-a-Service'],
    url: 'https://online-learning.harvard.edu/'
  },
  {
    id: 'cert-k8s-docker',
    name: 'Kubernetes & Modern DevOps for Tech Leaders',
    provider: 'The Linux Foundation (CNCF)',
    estimatedDuration: '4 weeks (28 hours)',
    cost: '$395 USD',
    expectedMatchBoostPercent: 11,
    skillsAddressed: ['Kubernetes', 'CI/CD Pipelines', 'Docker Microservices', 'High Availability'],
    url: 'https://www.cncf.io/certification/'
  },
  {
    id: 'cert-pmp-agile',
    name: 'Project Management Professional (PMP) / Agile Scaled',
    provider: 'Project Management Institute (PMI)',
    estimatedDuration: '8 weeks (60 hours)',
    cost: '$405 USD',
    expectedMatchBoostPercent: 8,
    skillsAddressed: ['Budget Oversight', 'Scaled Agile Framework (SAFe)', 'Risk Mitigation', 'Procurement'],
    url: 'https://www.pmi.org/certifications/project-management-pmp'
  }
];
