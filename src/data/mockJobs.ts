import { Job } from '../types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Principal AI Product Manager',
    company: 'CognitiveScale Enterprise',
    companyLogoBg: 'bg-indigo-600',
    location: 'San Francisco, CA',
    workModel: 'Hybrid',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Product Management',
    salaryMin: 195000,
    salaryMax: 240000,
    currency: 'USD',
    experienceLevel: 'Lead / Staff',
    postedDate: '2 hours ago',
    featured: true,
    description: 'We are seeking an visionary Principal Product Manager to own our next-generation Enterprise LLM Orchestration and agentic workflow platform. You will lead cross-functional pods of ML engineers, designers, and go-to-market leaders to deploy reliable AI assistants for Fortune 500 customers.',
    responsibilities: [
      'Define the multi-year product roadmap for enterprise Generative AI agents.',
      'Work closely with research scientists to translate frontier LLM capabilities into enterprise SaaS workflows.',
      'Partner with enterprise security and legal teams to establish robust AI safety, governance, and audit trails.',
      'Engage strategic enterprise customers to gather feedback and drive adoption.'
    ],
    requiredSkills: [
      'Product Strategy',
      'AI & GenAI Solutions',
      'Roadmap Prioritization',
      'Enterprise SaaS Metrics',
      'Cross-Functional Leadership',
      'API Architecture'
    ],
    niceToHaveSkills: [
      'RAG Architectures',
      'LLM Evaluation Benchmarks',
      'SOC2 / ISO AI Compliance'
    ],
    benefits: [
      'Top-tier equity compensation',
      '401(k) match up to 6%',
      'Full healthcare, dental & vision premium coverage',
      '$3,000 annual learning & certification stipend'
    ],
    matchScore: 94,
    matchLabel: 'Strong Match',
    goodFitReasons: [
      'Direct match with your 7+ years of SaaS product leadership and recent track record delivering $8.4M ARR in enterprise GenAI suites at Synthetix AI.',
      'Role utilizes your proven strength leading cross-functional pods (engineering, UX, and data science).',
      'Salary range ($195k - $240k) and hybrid San Francisco location perfectly match your target compensation and commute preferences.'
    ],
    notGoodFitReasons: [
      'Requires deep familiarization with SOC2 & ISO AI compliance standards which are not explicitly highlighted in your CV.',
      'High-visibility executive presence expected with Fortune 500 CIOs and procurement leaders.'
    ],
    skillsGap: [
      {
        skill: 'LLM Safety & Compliance Standards',
        importance: 'Medium',
        recommendation: 'Complete Stanford Online or Cloud Security Alliance certification in AI safety and governance.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-stanford-ai',
        name: 'Generative AI & LLM Systems for Enterprise',
        provider: 'Stanford Center for Professional Development',
        estimatedDuration: '4 weeks',
        cost: '$495',
        expectedMatchBoostPercent: 6,
        skillsAddressed: ['LLM Orchestration', 'RAG Architectures', 'Model Evaluation & Safety']
      }
    ]
  },
  {
    id: 'job-2',
    title: 'Senior Product Manager - Global Payments',
    company: 'StripeNova FinTech',
    companyLogoBg: 'bg-emerald-600',
    location: 'New York, NY',
    workModel: 'Remote',
    industry: 'FinTech & Payments',
    jobFamily: 'Product Management',
    salaryMin: 180000,
    salaryMax: 220000,
    currency: 'USD',
    experienceLevel: 'Senior',
    postedDate: '1 day ago',
    featured: true,
    description: 'Join our Core Ledger & Settlement engineering group to architect high-throughput international payment rails, multi-currency wallets, and real-time fraud mitigation tools handling billions in monthly gross merchandise value.',
    responsibilities: [
      'Own end-to-end payment API specifications and developer experience documentation.',
      'Drive fraud prevention algorithms in partnership with risk engineering teams.',
      'Ensure strict adherence to PCI-DSS Level 1 and regional banking laws across Europe and North America.',
      'Conduct A/B tests on checkout conversion friction.'
    ],
    requiredSkills: [
      'Product Strategy',
      'API Architecture',
      'SQL & Product Analytics',
      'FinTech Regulations',
      'PCI-DSS Compliance',
      'SaaS Metrics'
    ],
    niceToHaveSkills: [
      'Cross-Border FX Clearing',
      'Banking-as-a-Service (BaaS)',
      'GraphQL & Webhooks'
    ],
    benefits: [
      '100% remote flexibility across US/Canada',
      'Annual home office setup allowance ($2,500)',
      'Unlimited flexible paid time off (FTO)',
      'Quarterly wellness stipends'
    ],
    matchScore: 81,
    matchLabel: 'Good Match',
    goodFitReasons: [
      'Outstanding background in microservices billing and core API infrastructure from your tenure at Apex Cloud Networks.',
      'Strong quantitative analytics ability with SQL and product metrics.',
      '100% remote flexibility fits your preference spectrum.'
    ],
    notGoodFitReasons: [
      'The position requires specialized FinTech compliance (PCI-DSS, AML/KYC) and payment ledger expertise, whereas your primary focus has been AI platforms and general cloud SaaS.',
      'You may need to demonstrate prior domain experience navigating banking partner regulations.'
    ],
    skillsGap: [
      {
        skill: 'PCI-DSS Compliance & Banking Rails',
        importance: 'High',
        recommendation: 'Enroll in an accredited FinTech Regulations & Banking Rails credential.'
      },
      {
        skill: 'AML / KYC Fraud Flow Architecture',
        importance: 'Medium',
        recommendation: 'Review payment processor developer sandboxes and fraud mitigation case studies.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-fintech-compliance',
        name: 'FinTech Regulations & Global Compliance (AML/KYC)',
        provider: 'Harvard Online & FinTech Association',
        estimatedDuration: '5 weeks',
        cost: '$850',
        expectedMatchBoostPercent: 14,
        skillsAddressed: ['FinTech Regulations', 'PCI-DSS Compliance', 'AML/KYC Flows']
      }
    ]
  },
  {
    id: 'job-3',
    title: 'Director of Product - SaaS Platform & Ecosystem',
    company: 'HyperFlow Cloud Systems',
    companyLogoBg: 'bg-blue-600',
    location: 'San Francisco, CA',
    workModel: 'Hybrid',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Product Management',
    salaryMin: 230000,
    salaryMax: 285000,
    currency: 'USD',
    experienceLevel: 'Director / VP',
    postedDate: '3 days ago',
    description: 'We are looking for a seasoned Director of Product to manage a team of 6 PMs and drive our developer ecosystem, third-party app marketplace, and core multi-tenant platform services.',
    responsibilities: [
      'Lead and mentor a high-performing product team across platform, APIs, and partner ecosystems.',
      'Own executive business cases and quarterly P&L allocations with C-suite stakeholders.',
      'Establish product operations standards, customer discovery frameworks, and roadmap governance.'
    ],
    requiredSkills: [
      'Product Strategy',
      'Cross-Functional Leadership',
      'People Management (5+ PMs)',
      'Enterprise SaaS Metrics',
      'P&L / Budget Oversight',
      'Developer APIs'
    ],
    niceToHaveSkills: [
      'Marketplace Economics',
      'Strategic M&A Integrations',
      'Pragmatic Institute / Stanford Executive Certifications'
    ],
    benefits: [
      'Substantial equity grant with early liquidity options',
      'Executive coaching and leadership development',
      'Full family healthcare coverage',
      'Flexible hybrid schedule (2 days in office)'
    ],
    matchScore: 86,
    matchLabel: 'Good Match',
    goodFitReasons: [
      'Superb history scaling product lines from early stage to $18M ARR.',
      'Strong cross-functional leadership, CSPO certification, and technical background from UC Berkeley.',
      'Compensation ($230k-$285k) provides a great career step forward.'
    ],
    notGoodFitReasons: [
      'Role explicitly requests 3+ years of direct people management over other Product Managers, whereas your recent roles emphasize cross-functional squad leadership rather than people manager hierarchy.',
      'Extensive P&L and financial modeling accountability required.'
    ],
    skillsGap: [
      {
        skill: 'Direct PM People Management & Mentorship',
        importance: 'High',
        recommendation: 'Highlight formal mentorship and leadership contributions, or earn executive product management credentials.'
      },
      {
        skill: 'P&L / Enterprise Budget Allocation',
        importance: 'Medium',
        recommendation: 'Complete Pragmatic Institute PMC or executive financial modeling modules.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-pragmatic-pm',
        name: 'PMC-III Product Master Certification',
        provider: 'Pragmatic Institute',
        estimatedDuration: '3 weeks',
        cost: '$1,295',
        expectedMatchBoostPercent: 9,
        skillsAddressed: ['Market Validation', 'Product Pricing Strategy', 'Executive Business Case Formulation']
      }
    ]
  },
  {
    id: 'job-4',
    title: 'Staff Solutions Architect - Cloud & Generative AI',
    company: 'Apex Cloud Networks',
    companyLogoBg: 'bg-purple-600',
    location: 'Austin, TX',
    workModel: 'Remote',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Architecture & Cloud',
    salaryMin: 185000,
    salaryMax: 235000,
    currency: 'USD',
    experienceLevel: 'Lead / Staff',
    postedDate: '5 days ago',
    description: 'Design robust, secure multi-cloud architectures for tier-1 enterprises deploying large language models, high-concurrency vector databases, and real-time inference clusters.',
    responsibilities: [
      'Author architectural blueprints, reference architectures, and security whitepapers.',
      'Guide enterprise technical buyers on Kubernetes deployment, AWS/GCP migration, and latency optimization.',
      'Bridge engineering teams with executive customer sponsors.'
    ],
    requiredSkills: [
      'Cloud Architecture',
      'AWS Infrastructure',
      'Distributed Systems',
      'Kubernetes',
      'API Architecture',
      'Security & IAM'
    ],
    niceToHaveSkills: [
      'AWS Solutions Architect Professional',
      'Terraform / Helm',
      'Vector Databases (Milvus, Pinecone)'
    ],
    benefits: [
      'Fully remote US location',
      'Generous hardware allowance',
      'Annual technical summit in Austin, TX',
      'Comprehensive 401(k) 100% match up to 5%'
    ],
    matchScore: 68,
    matchLabel: 'Moderate Match',
    goodFitReasons: [
      'Strong foundational computer science degree from UC Berkeley.',
      'AWS Certified Cloud Practitioner and deep familiarity with API architectures.',
      'Prior experience working at Apex Cloud Networks gives insider familiarity with their tech stack.'
    ],
    notGoodFitReasons: [
      'This is a pure hands-on technical architecture role requiring deep Kubernetes cluster configuration, distributed systems debugging, and Infrastructure-as-Code (Terraform), whereas your career path is product management.',
      'Requires Professional-level AWS/GCP certification rather than practitioner-level.'
    ],
    skillsGap: [
      {
        skill: 'AWS Certified Solutions Architect (Associate/Pro)',
        importance: 'High',
        recommendation: 'Attain AWS Solutions Architect Associate or Professional certification.'
      },
      {
        skill: 'Kubernetes & Container Orchestration',
        importance: 'High',
        recommendation: 'Complete CNCF Kubernetes certification for hands-on production cluster orchestration.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-aws-solutions-arch',
        name: 'AWS Certified Solutions Architect - Associate',
        provider: 'Amazon Web Services',
        estimatedDuration: '6-8 weeks',
        cost: '$150',
        expectedMatchBoostPercent: 18,
        skillsAddressed: ['Cloud Architecture', 'Distributed Systems', 'Security & IAM', 'AWS Infrastructure']
      },
      {
        id: 'cert-k8s-docker',
        name: 'Kubernetes & Modern DevOps for Tech Leaders',
        provider: 'The Linux Foundation (CNCF)',
        estimatedDuration: '4 weeks',
        cost: '$395',
        expectedMatchBoostPercent: 11,
        skillsAddressed: ['Kubernetes', 'CI/CD Pipelines', 'Docker Microservices']
      }
    ]
  },
  {
    id: 'job-5',
    title: 'Lead Product Manager - Clinical Healthtech & EHR',
    company: 'Vitalis Health BioTech',
    companyLogoBg: 'bg-teal-600',
    location: 'Boston, MA',
    workModel: 'Hybrid',
    industry: 'Healthcare & Biotech',
    jobFamily: 'Product Management',
    salaryMin: 175000,
    salaryMax: 215000,
    currency: 'USD',
    experienceLevel: 'Lead / Staff',
    postedDate: '4 days ago',
    description: 'Shape the clinician experience by integrating conversational AI into Electronic Health Record (EHR) workflows. Help doctors spend less time documenting and more time with patients.',
    responsibilities: [
      'Drive roadmap for HIPAA-compliant clinical ambient scribe and note automation.',
      'Collaborate with hospital medical boards and informatics teams to validate accuracy.',
      'Work with FHIR / HL7 interoperability standards.'
    ],
    requiredSkills: [
      'Product Strategy',
      'AI & GenAI Solutions',
      'HIPAA Compliance',
      'FHIR / HL7 Protocols',
      'Cross-Functional Leadership',
      'User Research & UX'
    ],
    niceToHaveSkills: [
      'Epic / Cerner EHR Integrations',
      'Clinical Decision Support Systems'
    ],
    benefits: [
      'Tuition reimbursement for medical informatics',
      'Comprehensive family medical coverage',
      '20 days paid vacation + 10 personal days'
    ],
    matchScore: 74,
    matchLabel: 'Moderate Match',
    goodFitReasons: [
      'Your AI assistant deployment expertise and customer discovery skills map directly to ambient voice and AI note tools.',
      'Strong UX research foundation from UC Berkeley Cognitive Sciences background.'
    ],
    notGoodFitReasons: [
      'Strict requirement for healthcare regulatory compliance (HIPAA, FDA guidance) and healthcare data protocols (HL7/FHIR) which are outside your current portfolio.',
      'Requires regular on-site presence at Boston hospital research centers.'
    ],
    skillsGap: [
      {
        skill: 'HIPAA & Healthcare Data Interoperability (HL7/FHIR)',
        importance: 'High',
        recommendation: 'Take Harvard or edX courses in Digital Health Systems and HL7 Fast Healthcare Interoperability Resources.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-pmp-agile',
        name: 'Project Management Professional (PMP) / Agile Scaled',
        provider: 'Project Management Institute (PMI)',
        estimatedDuration: '8 weeks',
        cost: '$405',
        expectedMatchBoostPercent: 8,
        skillsAddressed: ['Risk Mitigation', 'Procurement', 'Regulatory Process Tracking']
      }
    ]
  },
  {
    id: 'job-6',
    title: 'Senior Technical Program Manager - AI Infrastructure',
    company: 'OmniCloud Systems',
    companyLogoBg: 'bg-cyan-700',
    location: 'Seattle, WA',
    workModel: 'Hybrid',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Product Management',
    salaryMin: 180000,
    salaryMax: 225000,
    currency: 'USD',
    experienceLevel: 'Senior',
    postedDate: '1 week ago',
    description: 'Coordinate complex infrastructure migrations, GPU cluster scheduling, and model serving pipelines across multiple geographic data centers.',
    responsibilities: [
      'Drive dependency tracking and risk mitigation across 8 platform engineering teams.',
      'Define SLA/SLO metrics and automated incident post-mortem cycles.',
      'Manage multi-million dollar GPU reservation capacity plans.'
    ],
    requiredSkills: [
      'Cross-Functional Leadership',
      'Agile & Scrum (CSPO)',
      'Roadmap Prioritization',
      'Cloud Systems (AWS / GCP)',
      'Budget Oversight',
      'Stakeholder Management'
    ],
    niceToHaveSkills: [
      'PMP / SAFe Certification',
      'Kubernetes Scheduler',
      'Jira Advanced Roadmaps'
    ],
    benefits: [
      'Stock grant matching top tier tech',
      'Commuter transit passes & electric vehicle charging',
      'Wellness and fitness memberships'
    ],
    matchScore: 89,
    matchLabel: 'Strong Match',
    goodFitReasons: [
      'CSPO certification and proven track record managing multi-timezone engineering teams.',
      'Experience in microservices and platform architecture at Apex Cloud Networks.',
      'Salary bracket perfectly aligns with your target compensation.'
    ],
    notGoodFitReasons: [
      'Position is Technical Program Management (TPM) rather than Product Management (PM), emphasizing scheduling and execution over user discovery and product vision.',
      'Hybrid presence required in Seattle, WA office.'
    ],
    skillsGap: [
      {
        skill: 'Scaled Agile Framework (SAFe) / Advanced TPM tooling',
        importance: 'Medium',
        recommendation: 'Acquire PMP or PMI-ACP credential to validate enterprise program scale.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-pmp-agile',
        name: 'Project Management Professional (PMP) / Agile Scaled',
        provider: 'Project Management Institute (PMI)',
        estimatedDuration: '8 weeks',
        cost: '$405',
        expectedMatchBoostPercent: 9,
        skillsAddressed: ['Budget Oversight', 'Scaled Agile Framework (SAFe)', 'Risk Mitigation']
      }
    ]
  },
  {
    id: 'job-7',
    title: 'Senior Product Manager - E-Commerce & Personalization',
    company: 'CartWave Global',
    companyLogoBg: 'bg-amber-600',
    location: 'London, UK',
    workModel: 'Remote',
    industry: 'E-Commerce',
    jobFamily: 'Product Management',
    salaryMin: 160000,
    salaryMax: 200000,
    currency: 'USD',
    experienceLevel: 'Senior',
    postedDate: '3 days ago',
    description: 'Scale consumer recommendation algorithms, dynamic pricing, and frictionless multi-currency checkout for 40M+ global online shoppers.',
    responsibilities: [
      'Run rigorous multivariate statistical tests across 50M monthly impressions.',
      'Partner with data scientists on collaborative filtering and vector search algorithms.',
      'Optimize average order value (AOV) and conversion rates across mobile apps.'
    ],
    requiredSkills: [
      'Product Strategy',
      'SQL & Product Analytics',
      'User Experience (UX) Research',
      'A/B Testing & Statistics',
      'E-Commerce Personalization',
      'Go-to-Market Strategy'
    ],
    niceToHaveSkills: [
      'Search & Merchandising algorithms',
      'Optimizely / LaunchDarkly experimentation'
    ],
    benefits: [
      'Generous merchandise discounts',
      'Flexible working hours across UTC and EST',
      'Annual international team retreats'
    ],
    matchScore: 84,
    matchLabel: 'Good Match',
    goodFitReasons: [
      'Strong quantitative and experimentation abilities with SQL and UX discovery.',
      'Experience optimizing user funnels and retention (+28% increase at Synthetix).',
      'Fully remote international flexibility.'
    ],
    notGoodFitReasons: [
      'Prior domain was primarily B2B enterprise SaaS rather than B2C high-volume consumer retail.',
      'Salary ceiling is slightly below your top preference ($200k max vs your $225k target).'
    ],
    skillsGap: [
      {
        skill: 'High-Volume Consumer Experimentation (A/B Testing)',
        importance: 'Medium',
        recommendation: 'Highlight statistical testing methodologies and consumer UX experiments in your interview portfolio.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-pragmatic-pm',
        name: 'PMC-III Product Master Certification',
        provider: 'Pragmatic Institute',
        estimatedDuration: '3 weeks',
        cost: '$1,295',
        expectedMatchBoostPercent: 7,
        skillsAddressed: ['Market Validation', 'Product Pricing Strategy']
      }
    ]
  },
  {
    id: 'job-8',
    title: 'Lead AI Engineer & LLM Systems Architect',
    company: 'NeuralMatrix Labs',
    companyLogoBg: 'bg-rose-600',
    location: 'San Francisco, CA',
    workModel: 'On-site',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Data & Machine Learning',
    salaryMin: 220000,
    salaryMax: 290000,
    currency: 'USD',
    experienceLevel: 'Lead / Staff',
    postedDate: '6 hours ago',
    description: 'Train, fine-tune, and deploy multi-modal foundation models. Implement low-latency distributed inference using vLLM, TensorRT-LLM, and Triton Inference Server.',
    responsibilities: [
      'Conduct pre-training and LoRA / QLoRA parameter-efficient fine-tuning on proprietary corpora.',
      'Optimize KV-cache memory usage and speculative decoding techniques.',
      'Publish research findings at leading ML conferences (NeurIPS, ICML).'
    ],
    requiredSkills: [
      'PyTorch / JAX',
      'Distributed Model Training',
      'CUDA Optimization',
      'vLLM / Triton',
      'Vector Search',
      'Python & C++'
    ],
    niceToHaveSkills: [
      'FlashAttention kernel development',
      'First-author ML publications'
    ],
    benefits: [
      'Access to state-of-the-art H100 cluster',
      'Competitive equity upside',
      'Daily catered meals and private chef in SF'
    ],
    matchScore: 48,
    matchLabel: 'Growth Opportunity',
    goodFitReasons: [
      'High-level conceptual understanding of GenAI models, prompt workflows, and AI evaluation metrics.',
      'Computer Science foundational degree from UC Berkeley.',
      'Location in San Francisco fits.'
    ],
    notGoodFitReasons: [
      'This role is a deeply technical research and ML engineering position demanding hands-on PyTorch, CUDA, and distributed GPU cluster programming, which is fundamentally different from a Product Manager skill set.',
      'Strict 5-day on-site requirement conflicts with your preference for Hybrid or Remote.'
    ],
    skillsGap: [
      {
        skill: 'CUDA Kernel Programming & Low-Level PyTorch Optimization',
        importance: 'High',
        recommendation: 'Requires years of specialized deep learning and systems engineering training.'
      },
      {
        skill: 'Distributed GPU Cluster Training',
        importance: 'High',
        recommendation: 'Significant pivot into ML engineering needed.'
      }
    ],
    recommendedCertifications: [
      {
        id: 'cert-stanford-ai',
        name: 'Generative AI & LLM Systems for Enterprise',
        provider: 'Stanford Center for Professional Development',
        estimatedDuration: '4 weeks',
        cost: '$495',
        expectedMatchBoostPercent: 12,
        skillsAddressed: ['LLM Orchestration', 'RAG Architectures', 'Model Evaluation & Safety']
      }
    ]
  }
];

export const mockSavedSearches = [
  {
    id: 'saved-1',
    name: 'Senior AI & Platform Product Lead (SF / Remote)',
    keywords: 'AI, Product Manager, Platform, LLM',
    jobTitle: 'Product Management',
    location: 'San Francisco, CA (or Remote)',
    industry: 'Enterprise SaaS & AI',
    jobFamily: 'Product Management',
    minSalary: 180000,
    workModel: 'Hybrid or Remote',
    alertFrequency: 'instant' as const,
    emailAlerts: true,
    inAppAlerts: true,
    minMatchScore: 80,
    isActive: true,
    createdAt: '2025-05-10',
    newMatchesCount: 3
  },
  {
    id: 'saved-2',
    name: 'Executive FinTech / Payments Roles ($200k+)',
    keywords: 'Payments, FinTech, Director, VP',
    jobTitle: 'Product Management',
    location: 'Remote',
    industry: 'FinTech & Payments',
    jobFamily: 'Product Management',
    minSalary: 200000,
    workModel: 'Remote',
    alertFrequency: 'daily' as const,
    emailAlerts: true,
    inAppAlerts: true,
    minMatchScore: 75,
    isActive: true,
    createdAt: '2025-05-18',
    newMatchesCount: 1
  }
];

export const mockInitialNotifications = [
  {
    id: 'notif-1',
    title: 'New High Match: Principal AI Product Manager',
    message: 'CognitiveScale Enterprise just posted a role matching 94% of your CV and target salary ($195k - $240k).',
    timestamp: '15 mins ago',
    read: false,
    type: 'new_match' as const,
    jobId: 'job-1',
    matchScore: 94
  },
  {
    id: 'notif-2',
    title: 'Saved Search Alert: 2 new openings detected',
    message: 'Your search "Senior AI & Platform Product Lead" matched 2 new roles this morning.',
    timestamp: '2 hours ago',
    read: false,
    type: 'saved_search' as const
  },
  {
    id: 'notif-3',
    title: 'Upskilling Opportunity Identified',
    message: 'Adding an AWS Solutions Architect certificate can increase your match score by +14% for 4 upcoming senior cloud roles.',
    timestamp: '1 day ago',
    read: true,
    type: 'upskilling' as const
  }
];
