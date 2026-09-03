import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Linkedin, 
  FileText, 
  CheckCircle2, 
  Cloud, 
  ExternalLink, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Award, 
  DollarSign, 
  MapPin, 
  RefreshCw,
  Folder,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CandidateProfile } from '../types';

interface CandidateProfileHubProps {
  profile: CandidateProfile;
  onUpdateProfile: (updated: Partial<CandidateProfile>) => void;
  onReanalyzeCV: () => void;
  isAnalyzing: boolean;
}

export const CandidateProfileHub: React.FC<CandidateProfileHubProps> = ({
  profile,
  onUpdateProfile,
  onReanalyzeCV,
  isAnalyzing,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [linkedinInput, setLinkedinInput] = useState(profile.linkedinUrl);
  const [isSyncingLinkedin, setIsSyncingLinkedin] = useState(false);
  const [showCloudDriveModal, setShowCloudDriveModal] = useState(false);
  const [selectedCloudProvider, setSelectedCloudProvider] = useState<'google_drive' | 'dropbox' | 'onedrive' | 'box'>('google_drive');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [newSkillInput, setNewSkillInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLocalFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLocalFileUpload = (file: File) => {
    const fileName = file.name;
    setUploadSuccessMsg(`Uploaded "${fileName}" successfully! Parsing CV details...`);
    onUpdateProfile({
      cvFileName: fileName,
      cvSource: 'local',
      cvLastUpdated: 'Just now'
    });
    onReanalyzeCV();
    setTimeout(() => setUploadSuccessMsg(null), 5000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLocalFileUpload(e.target.files[0]);
    }
  };

  // Cloud Drive simulated files
  const cloudFiles = {
    google_drive: [
      { name: 'Sarah_Chen_Senior_Product_Lead_2025.pdf', size: '284 KB', modified: '2 days ago' },
      { name: 'Sarah_Chen_Executive_CV_v4.docx', size: '190 KB', modified: 'Last week' },
      { name: 'Product_Portfolio_Highlights.pdf', size: '1.2 MB', modified: 'May 2025' }
    ],
    dropbox: [
      { name: 'Sarah_Chen_Resume_AI_Platform.pdf', size: '310 KB', modified: 'Yesterday' },
      { name: 'Credentials_Certifications_List.pdf', size: '120 KB', modified: '3 weeks ago' }
    ],
    onedrive: [
      { name: 'CV_SarahChen_PrincipalPM.pdf', size: '240 KB', modified: '3 days ago' },
      { name: 'Bio_Leadership_Summary.docx', size: '95 KB', modified: '2 months ago' }
    ],
    box: [
      { name: 'Sarah_Chen_Enterprise_CV.pdf', size: '290 KB', modified: '1 week ago' }
    ]
  };

  const handleSelectCloudFile = (fileName: string) => {
    onUpdateProfile({
      cvFileName: fileName,
      cvSource: selectedCloudProvider,
      cvLastUpdated: 'Just now from ' + selectedCloudProvider.replace('_', ' ').toUpperCase()
    });
    setShowCloudDriveModal(false);
    setUploadSuccessMsg(`Imported "${fileName}" from cloud drive. Re-matching jobs...`);
    onReanalyzeCV();
    setTimeout(() => setUploadSuccessMsg(null), 5000);
  };

  const handleSyncLinkedin = async () => {
    if (!linkedinInput.trim()) return;
    setIsSyncingLinkedin(true);
    try {
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinUrl: linkedinInput })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          onUpdateProfile({
            linkedinUrl: linkedinInput,
            skills: Array.from(new Set([...profile.skills, ...(data.profile.skills || [])])),
            title: data.profile.title || profile.title,
            summary: data.profile.summary || profile.summary
          });
          setUploadSuccessMsg('LinkedIn profile synced! Added verified competencies and refreshed match scores.');
          onReanalyzeCV();
        }
      }
    } catch (e) {
      console.warn('LinkedIn sync fallback');
      onUpdateProfile({ linkedinUrl: linkedinInput });
      setUploadSuccessMsg('LinkedIn URL saved to your profile.');
    } finally {
      setIsSyncingLinkedin(false);
      setTimeout(() => setUploadSuccessMsg(null), 5000);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!profile.skills.includes(newSkillInput.trim())) {
      onUpdateProfile({
        skills: [...profile.skills, newSkillInput.trim()]
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert banner if uploaded */}
      {uploadSuccessMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-sm text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{uploadSuccessMsg}</span>
        </div>
      )}

      {/* Main Candidate Card Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active Candidate" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0952c4] border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Candidate
                </span>
              </div>
              <p className="text-slate-600 font-medium text-base mt-0.5">{profile.title}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Target: ${profile.targetSalaryMin.toLocaleString()} - ${profile.targetSalaryMax.toLocaleString()} / yr
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Model: {profile.preferredWorkModel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onReanalyzeCV}
              disabled={isAnalyzing}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Re-analyzing Profile...' : 'Re-match All Jobs'}
            </button>
          </div>
        </div>

        {/* Profile Summary & Stats */}
        <div className="mt-5">
          <h2 className="text-xs font-semibold tracking-wider text-slate-700 uppercase mb-2">Executive Summary</h2>
          <p className="text-slate-700 text-sm leading-relaxed max-w-4xl">{profile.summary}</p>
        </div>
      </div>

      {/* Dual Upload Section: Local CV + Cloud Drive + LinkedIn */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV Upload Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0952c4] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Curriculum Vitae (CV)</h3>
                  <p className="text-xs text-slate-500">Upload from your computer or cloud storage</p>
                </div>
              </div>
              {profile.cvFileName && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {profile.cvSource ? `Source: ${profile.cvSource.replace('_', ' ')}` : 'Active CV'}
                </span>
              )}
            </div>

            {/* Currently Active CV status */}
            {profile.cvFileName ? (
              <div className="mb-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{profile.cvFileName}</p>
                    <p className="text-xs text-slate-500">Updated {profile.cvLastUpdated || 'recently'}</p>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-[#0952c4] hover:underline flex-shrink-0 ml-3"
                >
                  Replace CV
                </button>
              </div>
            ) : null}

            {/* Drag & Drop Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-[#0952c4] bg-blue-50/50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0952c4] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Click to upload or drag & drop your CV
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF, DOCX, or TXT (Max 15MB)
              </p>
            </div>
          </div>

          {/* Cloud Drive Import Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              Import from Cloud Drives
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCloudProvider('google_drive');
                  setShowCloudDriveModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
                Google Drive
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCloudProvider('dropbox');
                  setShowCloudDriveModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 inline-block" />
                Dropbox
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCloudProvider('onedrive');
                  setShowCloudDriveModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-sky-500 inline-block" />
                OneDrive
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCloudProvider('box');
                  setShowCloudDriveModal(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 inline-block" />
                Box Drive
              </button>
            </div>
          </div>
        </div>

        {/* LinkedIn Profile & Verified Credentials */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">LinkedIn Profile Sync</h3>
                  <p className="text-xs text-slate-500">Auto-enrich skills, certifications & endorsements</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Candidate LinkedIn Public URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0952c4] focus:bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSyncLinkedin}
                  disabled={isSyncingLinkedin}
                  className="px-4 py-2.5 bg-[#0077b5] hover:bg-[#006097] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isSyncingLinkedin ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {isSyncingLinkedin ? 'Syncing...' : 'Sync Profile'}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                AscentJobs automatically matches your LinkedIn headline and recommendations with live market job descriptions.
              </p>
            </div>

            {/* Existing Certifications & Credentials */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Active Certifications ({profile.certifications.length})
              </h4>
              <div className="space-y-2">
                {profile.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Education: {profile.education[0]}</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Profile Strength
            </span>
          </div>
        </div>
      </div>

      {/* Extracted Core Skills Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Extracted Skills & Competencies</h3>
            <p className="text-xs text-slate-500">
              These {profile.skills.length} skills are matched against live Job Descriptions (JDs) to compute fit scores.
            </p>
          </div>

          {/* Add skill pill */}
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Add skill (e.g. Kubernetes, RAG)..."
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0952c4]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[#0952c4] text-xs font-semibold group hover:bg-blue-100 transition-colors"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-blue-400 hover:text-blue-700 opacity-60 group-hover:opacity-100 font-bold ml-1"
                title="Remove skill"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience History Snippet */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#0952c4]" />
          Parsed Work Experience & Key Outcomes
        </h3>
        <div className="space-y-4">
          {profile.experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-slate-200 pl-4 py-1 relative">
              <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#0952c4]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">{exp.title}</h4>
                <span className="text-xs text-slate-500 font-medium">{exp.period}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mb-2">{exp.company}</p>
              <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                {exp.highlights.map((item, hi) => (
                  <li key={hi} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Drive Modal */}
      {showCloudDriveModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Cloud className="w-6 h-6 text-[#0952c4]" />
                <h3 className="text-lg font-bold text-slate-900 capitalize">
                  Import from {selectedCloudProvider.replace('_', ' ')}
                </h3>
              </div>
              <button
                onClick={() => setShowCloudDriveModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <p className="text-xs text-slate-500 mb-3">
                Select your most recent CV/Resume from your {selectedCloudProvider.replace('_', ' ')} account:
              </p>
              <div className="space-y-2">
                {cloudFiles[selectedCloudProvider].map((file, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectCloudFile(file.name)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#0952c4] hover:bg-blue-50/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0952c4] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#0952c4]">{file.name}</p>
                        <p className="text-[11px] text-slate-400">{file.size} · Modified {file.modified}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0952c4] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Connected account: sarah.chen@gmail.com</span>
              <button
                onClick={() => setShowCloudDriveModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
