import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Bookmark, 
  Share2, 
  ArrowUpRight, 
  Clock, 
  RefreshCw,
  TrendingUp,
  FileText,
  Plus,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { Job, CandidateProfile, RecommendedCert } from '../types';

interface JobDetailModalProps {
  job: Job | null;
  candidateProfile: CandidateProfile;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onApply: (job: Job) => void;
  hasApplied: boolean;
  onAddCertToLearningPlan: (cert: RecommendedCert) => void;
  completedCourseIds: string[];
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  candidateProfile,
  onClose,
  isSaved,
  onToggleSave,
  onApply,
  hasApplied,
  onAddCertToLearningPlan,
  completedCourseIds,
}) => {
  if (!job) return null;

  const [activeTab, setActiveTab] = useState<'fit_analysis' | 'job_details' | 'cv_compare'>('fit_analysis');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [customFeedbackMsg, setCustomFeedbackMsg] = useState<string | null>(null);

  const candidateSkillsLower = candidateProfile.skills.map(s => s.toLowerCase());
  const matchedSkills = job.requiredSkills.filter(s => 
    candidateSkillsLower.some(cs => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
  );
  const missingSkills = job.requiredSkills.filter(s => !matchedSkills.includes(s));

  const score = job.matchScore ?? 75;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${job.companyLogoBg} text-white font-black text-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                <span className="text-slate-800 font-bold">{job.company}</span>
                {job.glassdoorRating && (
                  <span 
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold"
                    title={`Glassdoor Rating: ${job.glassdoorRating.toFixed(1)} / 5.0`}
                  >
                    <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                    <span>{job.glassdoorRating.toFixed(1)}</span>
                    <span className="text-[9px] font-medium text-emerald-700">Glassdoor</span>
                  </span>
                )}
                <span>•</span>
                <span>{job.industry}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Posted {job.postedDate}</span>
                  <span className="text-slate-400 font-normal">({job.daysOpen} {job.daysOpen === 1 ? 'day' : 'days'} open)</span>
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1 text-slate-900 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <DollarSign className="w-3.5 h-3.5" />
                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} / year
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location} ({job.workModel})
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {job.experienceLevel}
                </span>
                <span className="flex items-center gap-1 text-[#0952c4] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold">
                  <Users className="w-3.5 h-3.5 text-[#0952c4]" />
                  {job.applicantsCount.toLocaleString()} applicants to date
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Job saved' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-sm font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('fit_analysis')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'fit_analysis'
                ? 'border-[#0952c4] text-[#0952c4]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Fit & Skills Gap Analysis
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-100 text-[#0952c4] text-[10px]">
              {score}%
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('job_details')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'job_details'
                ? 'border-[#0952c4] text-[#0952c4]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Full Job Description
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cv_compare')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'cv_compare'
                ? 'border-[#0952c4] text-[#0952c4]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            CV Side-by-Side Comparison
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: AI FIT & SKILLS GAP */}
          {activeTab === 'fit_analysis' && (
            <div className="space-y-6">
              {/* Top Score Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-blue-200">
                    <span className="text-2xl font-black text-[#0952c4]">{score}%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        {job.matchLabel || (score >= 85 ? 'Strong Match' : 'Good Match')}
                      </h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0952c4]">
                        Ascent Match Engine
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Evaluated against {candidateProfile.name}'s active CV ({candidateProfile.cvFileName || 'Uploaded CV'})
                    </p>
                  </div>
                </div>

                <div className="text-right sm:text-left text-xs font-medium text-slate-600">
                  <span>Matched: <strong className="text-emerald-700 font-bold">{matchedSkills.length} skills</strong></span>
                  <span className="mx-2">•</span>
                  <span>Gaps: <strong className="text-amber-700 font-bold">{missingSkills.length} skills</strong></span>
                </div>
              </div>

              {/* 1. WHY THIS IS A GOOD FIT */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950">Why this Job is a Good Fit</h3>
                    <p className="text-[11px] text-emerald-700">Specific areas where your profile strongly meets JD requirements</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {(job.goodFitReasons || []).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. WHY THIS MAY NOT BE A GOOD FIT */}
              <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">Why this Job may NOT be a Good Fit</h3>
                    <p className="text-[11px] text-amber-700">Honest risks, missing domain criteria, or seniority variances</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {(job.notGoodFitReasons || []).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-amber-900 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. SKILLS GAP MATRIX */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>Skills Requirement Alignment</span>
                  <span className="text-xs font-normal text-slate-500">
                    {matchedSkills.length} of {job.requiredSkills.length} required skills confirmed
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Confirmed Matching Skills */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Matched Skills ({matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {matchedSkills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-900 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                      {matchedSkills.length === 0 && (
                        <p className="text-xs text-slate-400 italic">No direct keyword overlap found.</p>
                      )}
                    </div>
                  </div>

                  {/* Skills Gaps */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Identified Skills Gaps ({missingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {missingSkills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-amber-100/70 text-amber-900 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                      {missingSkills.length === 0 && (
                        <p className="text-xs text-emerald-700 font-semibold">No critical gaps! Full skill coverage.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. RECOMMENDED CERTIFICATIONS & TRAINING PROGRAMS */}
              <div className="border border-blue-200 bg-blue-50/30 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0952c4] text-white flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Recommended Certifications to Bridge Profile Gaps
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Earn these verified credentials to boost your match score for this position
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {(job.recommendedCertifications || []).map((cert, idx) => {
                    const isDone = completedCourseIds.includes(cert.id);
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              +{cert.expectedMatchBoostPercent}% Match Boost
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Issued by <strong className="text-slate-700">{cert.provider}</strong> • Duration: {cert.estimatedDuration}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Completed
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                onAddCertToLearningPlan(cert);
                                setCustomFeedbackMsg(`Added "${cert.name}" to your Learning Plan!`);
                                setTimeout(() => setCustomFeedbackMsg(null), 4000);
                              }}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0952c4] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add to Learning Plan
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {customFeedbackMsg && (
                  <p className="mt-3 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {customFeedbackMsg}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: FULL JOB DESCRIPTION */}
          {activeTab === 'job_details' && (
            <div className="space-y-5 text-sm text-slate-700">
              {/* Employer & Posting Metrics Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50/90 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Employer Reputation</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{job.glassdoorRating.toFixed(1)} / 5.0</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">Glassdoor</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Posting Timeline</span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-800 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.postedDate}</span>
                    <span className="text-slate-500 font-semibold">({job.daysOpen} {job.daysOpen === 1 ? 'day' : 'days'} open)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Application Activity</span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#0952c4] font-bold">
                    <Users className="w-3.5 h-3.5 text-[#0952c4]" />
                    <span>{job.applicantsCount.toLocaleString()} applicants to date</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Role Overview
                </h3>
                <p className="leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Responsibilities
                </h3>
                <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed text-slate-700">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Required Competencies & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {job.niceToHaveSkills && job.niceToHaveSkills.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Preferred / Nice-to-Have
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.niceToHaveSkills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {job.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CV SIDE-BY-SIDE */}
          {activeTab === 'cv_compare' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate's CV Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0952c4]" />
                  Your Profile ({candidateProfile.name})
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Headline:</span>
                    <span className="font-semibold text-slate-900">{candidateProfile.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Target Compensation:</span>
                    <span className="font-semibold text-slate-900">
                      ${candidateProfile.targetSalaryMin.toLocaleString()} - ${candidateProfile.targetSalaryMax.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Key Experience Highlights:</span>
                    <ul className="space-y-1 list-disc list-inside text-slate-700 text-[11px]">
                      {candidateProfile.experience[0]?.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Active Credentials:</span>
                    <div className="flex flex-wrap gap-1">
                      {candidateProfile.certifications.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-100/70 text-[#0952c4] rounded text-[10px] font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Expectations Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  Job Requirements ({job.title})
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Role Budget:</span>
                    <span className="font-semibold text-slate-900">
                      ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ({job.currency})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location & Flexibility:</span>
                    <span className="font-semibold text-slate-900">{job.location} · {job.workModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Mandatory Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Fit Verdict:</span>
                    <p className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                      {job.goodFitReasons ? job.goodFitReasons[0] : 'Solid core alignment across tech and leadership.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            AscentJobs verifies job listings daily for candidate security
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onApply(job)}
              disabled={hasApplied}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                hasApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#0952c4] hover:bg-blue-700 text-white'
              }`}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Application Submitted
                </>
              ) : (
                <>
                  Apply with Active CV
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
