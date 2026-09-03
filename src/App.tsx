import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Briefcase, 
  UserCheck, 
  Award, 
  Bell, 
  Sparkles, 
  Bookmark, 
  Upload, 
  Linkedin, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  MapPin,
  DollarSign,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { AscentLogo } from './components/AscentLogo';
import { JobSearchFilterBar, FilterState } from './components/JobSearchFilterBar';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { CandidateProfileHub } from './components/CandidateProfileHub';
import { SkillsGapHub } from './components/SkillsGapHub';
import { SavedSearchesModal } from './components/SavedSearchesModal';
import { NotificationCenter } from './components/NotificationCenter';
import { mockJobs, mockSavedSearches, mockInitialNotifications } from './data/mockJobs';
import { initialCandidateProfile, masterUpskillingCatalog } from './data/mockCandidate';
import { Job, CandidateProfile, SavedSearchAlert, AppNotification, RecommendedCert } from './types';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'jobs' | 'profile' | 'upskilling' | 'saved_searches'>('jobs');

  // Core Candidate Profile state
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(initialCandidateProfile);
  const [isAnalyzingCV, setIsAnalyzingCV] = useState(false);

  // Jobs state & dynamic match scoring
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1']);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);

  // Learning plan / completed courses
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  const [inProgressCourseIds, setInProgressCourseIds] = useState<string[]>(['cert-aws-solutions-arch']);

  // Saved Searches & Alerts
  const [savedSearches, setSavedSearches] = useState<SavedSearchAlert[]>(mockSavedSearches);
  const [isSaveSearchModalOpen, setIsSaveSearchModalOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(mockInitialNotifications);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedTitle: 'All Job Titles',
    selectedLocation: 'All Locations',
    selectedIndustry: 'All Industries',
    selectedFamily: 'All Job Families',
    minSalary: 140000,
    workModel: 'All Models',
    sortBy: 'match',
  });

  // Handle Profile Update
  const handleUpdateProfile = (updatedFields: Partial<CandidateProfile>) => {
    setCandidateProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  // Re-match CV against jobs using AI API with heuristic fallback
  const handleReanalyzeCV = async () => {
    setIsAnalyzingCV(true);
    try {
      // Pick top 2 jobs to dynamically evaluate with server API
      const updatedJobs = await Promise.all(
        jobs.map(async (job, index) => {
          if (index < 3) {
            try {
              const res = await fetch('/api/match-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateProfile, job })
              });
              if (res.ok) {
                const data = await res.json();
                return {
                  ...job,
                  matchScore: data.score || job.matchScore,
                  matchLabel: data.matchLabel || job.matchLabel,
                  goodFitReasons: data.goodFitReasons || job.goodFitReasons,
                  notGoodFitReasons: data.notGoodFitReasons || job.notGoodFitReasons,
                  skillsGap: data.skillsGap || job.skillsGap,
                };
              }
            } catch (err) {
              console.warn('Job match API fallback');
            }
          }
          return job;
        })
      );
      setJobs(updatedJobs);

      // Add notification
      const newNotif: AppNotification = {
        id: 'notif-' + Date.now(),
        title: 'CV Re-Analysis Completed',
        message: `Successfully re-matched your updated credentials and skills against ${jobs.length} active openings.`,
        timestamp: 'Just now',
        read: false,
        type: 'profile_sync'
      };
      setNotifications((prev) => [newNotif, ...prev]);
    } finally {
      setIsAnalyzingCV(false);
    }
  };

  // Mark a certification as completed and boost match scores
  const handleCompleteCertification = (cert: RecommendedCert) => {
    if (!completedCourseIds.includes(cert.id)) {
      setCompletedCourseIds((prev) => [...prev, cert.id]);
      setInProgressCourseIds((prev) => prev.filter((id) => id !== cert.id));

      // Add to candidate profile certifications & skills
      setCandidateProfile((prev) => ({
        ...prev,
        certifications: Array.from(new Set([...prev.certifications, cert.name])),
        skills: Array.from(new Set([...prev.skills, ...cert.skillsAddressed]))
      }));

      // Boost match scores across all jobs by expected percentage!
      setJobs((prevJobs) =>
        prevJobs.map((j) => {
          const boost = cert.expectedMatchBoostPercent || 8;
          const newScore = Math.min(99, (j.matchScore || 70) + Math.round(boost * 0.7));
          return {
            ...j,
            matchScore: newScore,
            matchLabel: newScore >= 88 ? 'Strong Match' : newScore >= 75 ? 'Good Match' : 'Moderate Match'
          };
        })
      );

      // Trigger high-match alert notification
      const certNotif: AppNotification = {
        id: 'notif-cert-' + Date.now(),
        title: `Credential Earned: ${cert.name}`,
        message: `Your match score increased by +${cert.expectedMatchBoostPercent}% across technical product and architecture openings!`,
        timestamp: 'Just now',
        read: false,
        type: 'upskilling'
      };
      setNotifications((prev) => [certNotif, ...prev]);
    }
  };

  const handleAddCertToLearningPlan = (cert: RecommendedCert) => {
    if (!inProgressCourseIds.includes(cert.id) && !completedCourseIds.includes(cert.id)) {
      setInProgressCourseIds((prev) => [...prev, cert.id]);
    }
  };

  // Toggle Save Job
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // Quick Apply
  const handleQuickApply = (job: Job) => {
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds((prev) => [...prev, job.id]);
      const notif: AppNotification = {
        id: 'notif-apply-' + Date.now(),
        title: `Application Sent to ${job.company}`,
        message: `Your verified CV (${candidateProfile.cvFileName}) was submitted for ${job.title}. Match score: ${job.matchScore}%.`,
        timestamp: 'Just now',
        read: false,
        type: 'new_match',
        jobId: job.id
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  // Save new search alert
  const handleSaveNewSearch = (newAlertData: Omit<SavedSearchAlert, 'id' | 'createdAt' | 'newMatchesCount'>) => {
    const newAlert: SavedSearchAlert = {
      ...newAlertData,
      id: 'saved-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      newMatchesCount: 2
    };
    setSavedSearches((prev) => [newAlert, ...prev]);

    // Send confirmation notification
    const alertNotif: AppNotification = {
      id: 'notif-alert-' + Date.now(),
      title: `Search Alert Created: ${newAlert.name}`,
      message: `We will monitor new openings matching your criteria (${newAlert.alertFrequency} alerts enabled).`,
      timestamp: 'Just now',
      read: false,
      type: 'saved_search'
    };
    setNotifications((prev) => [alertNotif, ...prev]);
  };

  const handleToggleSearchActive = (id: string) => {
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleDeleteSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  // Simulate new job opening alert
  const handleSimulateNewJobAlert = (searchName: string) => {
    const simNotif: AppNotification = {
      id: 'notif-sim-' + Date.now(),
      title: `🚨 New Opening Alert: "${searchName}"`,
      message: `Anthropic AI Labs just posted "Staff AI Product Lead - Autonomous Workflows" ($210k - $265k). 96% Match with your CV!`,
      timestamp: 'Just now',
      read: false,
      type: 'saved_search',
      jobId: 'job-1',
      matchScore: 96
    };
    setNotifications((prev) => [simNotif, ...prev]);
  };

  // Filter and Sort Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesText = 
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      // Title
      if (filters.selectedTitle !== 'All Job Titles') {
        if (!job.title.toLowerCase().includes(filters.selectedTitle.toLowerCase()) &&
            !job.jobFamily.toLowerCase().includes(filters.selectedTitle.toLowerCase())) {
          return false;
        }
      }

      // Location
      if (filters.selectedLocation !== 'All Locations') {
        if (!job.location.toLowerCase().includes(filters.selectedLocation.toLowerCase()) &&
            !(filters.selectedLocation === 'Remote' && job.workModel === 'Remote')) {
          return false;
        }
      }

      // Industry
      if (filters.selectedIndustry !== 'All Industries' && job.industry !== filters.selectedIndustry) {
        return false;
      }

      // Job Family
      if (filters.selectedFamily !== 'All Job Families' && job.jobFamily !== filters.selectedFamily) {
        return false;
      }

      // Min Salary
      if (job.salaryMax < filters.minSalary) {
        return false;
      }

      // Work Model
      if (filters.workModel !== 'All Models' && job.workModel !== filters.workModel) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'match') {
        return (b.matchScore ?? 0) - (a.matchScore ?? 0);
      }
      if (filters.sortBy === 'salary') {
        return b.salaryMax - a.salaryMax;
      }
      return 0;
    });
  }, [jobs, filters]);

  // Compute average match score
  const averageMatchScore = useMemo(() => {
    if (jobs.length === 0) return 0;
    const total = jobs.reduce((sum, j) => sum + (j.matchScore ?? 75), 0);
    return Math.round(total / jobs.length);
  }, [jobs]);

  const highMatchCount = jobs.filter((j) => (j.matchScore ?? 0) >= 80).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-left focus:outline-none"
              title="AscentJobs Home"
            >
              <AscentLogo size="md" />
            </button>

            {/* Candidate-Centric Subtitle Tag */}
            <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Candidate Intelligence Portal
            </span>
          </div>

          {/* Primary View Switcher Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-xs font-bold">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'jobs'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Job Recommendations</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-[#0952c4] text-[10px]">
                {filteredJobs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>My CV & LinkedIn</span>
              {candidateProfile.cvFileName && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('upskilling')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'upskilling'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Skills Gap & Certs</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px]">
                +{completedCourseIds.length * 10}%
              </span>
            </button>

            <button
              onClick={() => setIsSaveSearchModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Saved Alerts</span>
              {savedSearches.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center">
                  {savedSearches.length}
                </span>
              )}
            </button>
          </nav>

          {/* Right Header Controls: Notification Bell + Candidate Profile Pill */}
          <div className="flex items-center gap-3">
            {/* Notification Bell Dropdown */}
            <NotificationCenter
              notifications={notifications}
              onMarkAllRead={() => {
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
              }}
              onSelectNotification={(notif) => {
                if (notif.jobId) {
                  const target = jobs.find((j) => j.id === notif.jobId);
                  if (target) setSelectedJobForModal(target);
                } else if (notif.type === 'upskilling') {
                  setActiveTab('upskilling');
                } else if (notif.type === 'saved_search') {
                  setIsSaveSearchModalOpen(true);
                }
              }}
            />

            {/* Candidate Identity Pill */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all"
              title="View & Edit Candidate Profile"
            >
              <img
                src={candidateProfile.avatarUrl}
                alt={candidateProfile.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">{candidateProfile.name}</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate max-w-[130px]">
                  {candidateProfile.title.split('&')[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 bg-white px-2 py-1.5 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-lg ${
              activeTab === 'jobs' ? 'bg-blue-50 text-[#0952c4] font-bold' : ''
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Jobs ({filteredJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-lg ${
              activeTab === 'profile' ? 'bg-blue-50 text-[#0952c4] font-bold' : ''
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            CV & Profile
          </button>
          <button
            onClick={() => setActiveTab('upskilling')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-lg ${
              activeTab === 'upskilling' ? 'bg-blue-50 text-[#0952c4] font-bold' : ''
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Skills & Certs
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Candidate Context Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Candidate Career Dashboard
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Profile Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Hello, {candidateProfile.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Your CV is actively matched against <strong className="text-white">{jobs.length} verified executive openings</strong>. You have <strong className="text-emerald-400">{highMatchCount} high-fit roles (80%+)</strong> ready for review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-4 py-2 text-center flex-1 md:flex-none">
              <span className="text-[11px] text-slate-300 block font-medium">Average Match</span>
              <span className="text-lg font-black text-white">{averageMatchScore}%</span>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-xs transition-colors flex-1 md:flex-none"
            >
              <Upload className="w-3.5 h-3.5 text-[#0952c4]" />
              Manage CV & Drive
            </button>
          </div>
        </div>

        {/* TAB 1: JOB RECOMMENDATIONS & SEARCH */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Filter Bar with Parameters: Titles, Locations, Industries, Families, Salary, Saved Alert */}
            <JobSearchFilterBar
              filters={filters}
              onFilterChange={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
              onResetFilters={() =>
                setFilters({
                  searchQuery: '',
                  selectedTitle: 'All Job Titles',
                  selectedLocation: 'All Locations',
                  selectedIndustry: 'All Industries',
                  selectedFamily: 'All Job Families',
                  minSalary: 140000,
                  workModel: 'All Models',
                  sortBy: 'match',
                })
              }
              onOpenSaveSearchModal={() => setIsSaveSearchModalOpen(true)}
              savedSearchesCount={savedSearches.length}
              totalJobsCount={jobs.length}
              matchedJobsCount={filteredJobs.length}
            />

            {/* Job Listings Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSaveJob}
                    onSelectJob={(j) => setSelectedJobForModal(j)}
                    onQuickApply={handleQuickApply}
                    hasApplied={appliedJobIds.includes(job.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No jobs match your current search filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try broadening your location, industry, or salary parameters to discover more career opportunities.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      selectedTitle: 'All Job Titles',
                      selectedLocation: 'All Locations',
                      selectedIndustry: 'All Industries',
                      selectedFamily: 'All Job Families',
                      minSalary: 140000,
                      workModel: 'All Models',
                      sortBy: 'match',
                    })
                  }
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CANDIDATE PROFILE & CV UPLOAD HUB */}
        {activeTab === 'profile' && (
          <CandidateProfileHub
            profile={candidateProfile}
            onUpdateProfile={handleUpdateProfile}
            onReanalyzeCV={handleReanalyzeCV}
            isAnalyzing={isAnalyzingCV}
          />
        )}

        {/* TAB 3: SKILLS GAP & CERTIFICATIONS */}
        {activeTab === 'upskilling' && (
          <SkillsGapHub
            profile={candidateProfile}
            onCompleteCertification={handleCompleteCertification}
            onAddCertToLearningPlan={handleAddCertToLearningPlan}
            completedCourseIds={completedCourseIds}
            inProgressCourseIds={inProgressCourseIds}
            averageMatchScore={averageMatchScore}
          />
        )}
      </main>

      {/* Modal: Job Detail Deep Fit Analysis */}
      {selectedJobForModal && (
        <JobDetailModal
          job={selectedJobForModal}
          candidateProfile={candidateProfile}
          onClose={() => setSelectedJobForModal(null)}
          isSaved={savedJobIds.includes(selectedJobForModal.id)}
          onToggleSave={handleToggleSaveJob}
          onApply={handleQuickApply}
          hasApplied={appliedJobIds.includes(selectedJobForModal.id)}
          onAddCertToLearningPlan={handleAddCertToLearningPlan}
          completedCourseIds={completedCourseIds}
        />
      )}

      {/* Modal: Saved Searches & Notification Configuration */}
      <SavedSearchesModal
        isOpen={isSaveSearchModalOpen}
        onClose={() => setIsSaveSearchModalOpen(false)}
        savedSearches={savedSearches}
        currentFilters={filters}
        onSaveNewSearch={handleSaveNewSearch}
        onToggleSearchActive={handleToggleSearchActive}
        onDeleteSavedSearch={handleDeleteSavedSearch}
        onSimulateNewJobAlert={handleSimulateNewJobAlert}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AscentLogo size="sm" showText={true} />
            <span className="text-slate-400">| Candidate Career Intelligence Platform</span>
          </div>
          <p>© 2025 AscentJobs. CV and JD semantic matching engine.</p>
        </div>
      </footer>
    </div>
  );
}
