import React from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
  hasApplied: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  onQuickApply,
  hasApplied,
}) => {
  const matchScore = job.matchScore ?? 75;

  // Determine score color badge
  const getScoreBadgeStyles = (score: number) => {
    if (score >= 88) {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        ring: 'text-emerald-600',
        label: 'Strong Match'
      };
    }
    if (score >= 75) {
      return {
        bg: 'bg-blue-50 text-[#0952c4] border-blue-200',
        dot: 'bg-[#0952c4]',
        ring: 'text-[#0952c4]',
        label: 'Good Match'
      };
    }
    if (score >= 60) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        ring: 'text-amber-500',
        label: 'Moderate Match'
      };
    }
    return {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      ring: 'text-slate-400',
      label: 'Growth Stretch'
    };
  };

  const badgeStyle = getScoreBadgeStyles(matchScore);

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Company + Match Badge + Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${job.companyLogoBg} text-white font-bold text-base flex items-center justify-center shadow-xs flex-shrink-0`}>
              {job.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                {job.company}
                {job.featured && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                    Featured
                  </span>
                )}
              </h4>
              <h3 
                onClick={() => onSelectJob(job)}
                className="text-base font-bold text-slate-900 group-hover:text-[#0952c4] cursor-pointer transition-colors line-clamp-1"
              >
                {job.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Match Score Badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${badgeStyle.bg}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{matchScore}%</span>
              <span className="hidden sm:inline font-semibold opacity-90">· {badgeStyle.label}</span>
            </div>

            {/* Save Job Button */}
            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Remove from saved jobs' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Location, Salary, Work Model, Experience Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 text-xs text-slate-600">
          <span className="flex items-center gap-1 font-semibold text-slate-900 bg-slate-100/80 px-2 py-0.5 rounded-md">
            <DollarSign className="w-3 h-3 text-slate-500" />
            ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-slate-400" />
            {job.location} ({job.workModel})
          </span>
          <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
            {job.industry}
          </span>
          <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-500">
            {job.experienceLevel}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400 ml-auto">
            <Clock className="w-3 h-3" />
            {job.postedDate}
          </span>
        </div>

        {/* Short Job Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
          {job.description}
        </p>

        {/* AI Fit Callout Box: Why Good Fit & Why Not Fit */}
        <div className="space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs mb-3.5">
          {job.goodFitReasons && job.goodFitReasons[0] && (
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-1">
                <strong className="text-emerald-900 font-semibold">Why Good Fit: </strong>
                {job.goodFitReasons[0]}
              </p>
            </div>
          )}

          {job.notGoodFitReasons && job.notGoodFitReasons[0] && (
            <div className="flex items-start gap-2 text-slate-700">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-1">
                <strong className="text-amber-900 font-semibold">Fit Gap: </strong>
                {job.notGoodFitReasons[0]}
              </p>
            </div>
          )}
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.requiredSkills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md text-slate-400">
              +{job.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectJob(job)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0952c4] font-semibold text-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Deep Fit & Gap Analysis</span>
        </button>

        <button
          onClick={() => onQuickApply(job)}
          disabled={hasApplied}
          className={`inline-flex items-center justify-center gap-1 py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
            hasApplied
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {hasApplied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </>
          ) : (
            <>
              Apply with CV
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
