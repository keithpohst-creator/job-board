import React, { useState } from 'react';
import { 
  Award, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Target,
  BarChart3,
  Check,
  Plus
} from 'lucide-react';
import { CandidateProfile, RecommendedCert } from '../types';
import { masterUpskillingCatalog } from '../data/mockCandidate';

interface SkillsGapHubProps {
  profile: CandidateProfile;
  onCompleteCertification: (cert: RecommendedCert) => void;
  onAddCertToLearningPlan: (cert: RecommendedCert) => void;
  completedCourseIds: string[];
  inProgressCourseIds: string[];
  averageMatchScore: number;
}

export const SkillsGapHub: React.FC<SkillsGapHubProps> = ({
  profile,
  onCompleteCertification,
  onAddCertToLearningPlan,
  completedCourseIds,
  inProgressCourseIds,
  averageMatchScore,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'cloud' | 'pm' | 'fintech'>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filterCerts = () => {
    if (activeCategory === 'all') return masterUpskillingCatalog;
    if (activeCategory === 'ai') return masterUpskillingCatalog.filter(c => c.name.includes('AI') || c.name.includes('LLM'));
    if (activeCategory === 'cloud') return masterUpskillingCatalog.filter(c => c.name.includes('AWS') || c.name.includes('Kubernetes'));
    if (activeCategory === 'pm') return masterUpskillingCatalog.filter(c => c.name.includes('Product') || c.name.includes('PMP'));
    if (activeCategory === 'fintech') return masterUpskillingCatalog.filter(c => c.name.includes('FinTech') || c.name.includes('Compliance'));
    return masterUpskillingCatalog;
  };

  const handleMarkComplete = (cert: RecommendedCert) => {
    onCompleteCertification(cert);
    setSuccessToast(`Congratulations! "${cert.name}" marked complete. Match score boosted!`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const potentialBoostTotal = masterUpskillingCatalog
    .filter(c => !completedCourseIds.includes(c.id))
    .reduce((acc, curr) => acc + curr.expectedMatchBoostPercent, 0);

  return (
    <div className="space-y-6">
      {/* Toast message */}
      {successToast && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-sm text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* Hero Overview: Career Readiness & Upskilling ROI */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0952c4] text-xs font-bold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              AI Skills Gap Intelligence
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              Targeted Upskilling & Certification Roadmaps
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              Based on your CV and active high-paying openings in <strong className="text-slate-900">{profile.title}</strong>, AscentJobs identified critical competencies that hiring teams seek. Completing these accredited certifications increases your profile match ranking by up to <strong className="text-emerald-700 font-bold">+{potentialBoostTotal}%</strong>.
            </p>
          </div>

          {/* Quick Stats Metric Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 font-medium block">Current Avg Match</span>
              <span className="text-2xl font-black text-[#0952c4] mt-0.5 block">{averageMatchScore}%</span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                Top 15% Candidate Tier
              </span>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 text-center">
              <span className="text-xs text-emerald-900 font-medium block">Completed Boost</span>
              <span className="text-2xl font-black text-emerald-700 mt-0.5 block">
                {completedCourseIds.length} Certs
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold block mt-1">
                +{completedCourseIds.length * 10}% Profile Rank
              </span>
            </div>
          </div>
        </div>

        {/* Identified Common Skills Gaps across Target Jobs */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-amber-500" />
            Top Gaps Detected Across Openings in Your Target Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-amber-50/40 border border-amber-200/70 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                <span>Distributed Cloud Architecture</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">High Demand</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Found in 65% of Senior & Staff roles; AWS Solutions Architect credential bridges this gap.
              </p>
            </div>

            <div className="p-3 bg-blue-50/40 border border-blue-200/70 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#0952c4] mb-1">
                <span>Enterprise GenAI Safety & RAG</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200 text-blue-900">Trending</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Found in 80% of Enterprise AI PM roles; Stanford Online GenAI program validates this.
              </p>
            </div>

            <div className="p-3 bg-purple-50/40 border border-purple-200/70 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
                <span>FinTech Compliance (PCI-DSS)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-200 text-purple-900">High Salary</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Unlocks payment & banking leadership roles averaging $210k+ base salary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Certifications Catalog */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0952c4]" />
              Accredited Certifications & Training Programs
            </h2>
            <p className="text-xs text-slate-500">
              Verified by top engineering & product hiring managers to address exact job requirements
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#0952c4] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveCategory('ai')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategory === 'ai'
                  ? 'bg-[#0952c4] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              AI & LLM
            </button>
            <button
              onClick={() => setActiveCategory('cloud')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategory === 'cloud'
                  ? 'bg-[#0952c4] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cloud & DevOps
            </button>
            <button
              onClick={() => setActiveCategory('pm')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategory === 'pm'
                  ? 'bg-[#0952c4] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Product & PMP
            </button>
            <button
              onClick={() => setActiveCategory('fintech')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategory === 'fintech'
                  ? 'bg-[#0952c4] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              FinTech & Regs
            </button>
          </div>
        </div>

        {/* Catalog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterCerts().map((cert) => {
            const isCompleted = completedCourseIds.includes(cert.id);
            const isInProgress = inProgressCourseIds.includes(cert.id);

            return (
              <div
                key={cert.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                    : isInProgress
                    ? 'bg-blue-50/30 border-blue-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cert.provider}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      +{cert.expectedMatchBoostPercent}% Match Boost
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 line-clamp-1">
                    {cert.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {cert.estimatedDuration}
                    </span>
                    {cert.cost && (
                      <span>• Cost: {cert.cost}</span>
                    )}
                  </div>

                  {/* Skills Addressed */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Skills Acquired:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsAddressed.map((s, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={cert.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#0952c4] hover:underline flex items-center gap-1"
                  >
                    Curriculum
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Completed
                      </span>
                    ) : (
                      <>
                        {!isInProgress && (
                          <button
                            type="button"
                            onClick={() => onAddCertToLearningPlan(cert)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            + Plan
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleMarkComplete(cert)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0952c4] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark Completed
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
