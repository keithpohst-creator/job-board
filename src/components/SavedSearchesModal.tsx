import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Plus, 
  Trash2, 
  Mail, 
  Smartphone, 
  Clock, 
  Sliders, 
  Sparkles, 
  CheckCircle2,
  Zap,
  Play
} from 'lucide-react';
import { SavedSearchAlert } from '../types';
import { FilterState } from './JobSearchFilterBar';

interface SavedSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSearches: SavedSearchAlert[];
  currentFilters: FilterState;
  onSaveNewSearch: (newAlert: Omit<SavedSearchAlert, 'id' | 'createdAt' | 'newMatchesCount'>) => void;
  onToggleSearchActive: (id: string) => void;
  onDeleteSavedSearch: (id: string) => void;
  onSimulateNewJobAlert: (searchName: string) => void;
}

export const SavedSearchesModal: React.FC<SavedSearchesModalProps> = ({
  isOpen,
  onClose,
  savedSearches,
  currentFilters,
  onSaveNewSearch,
  onToggleSearchActive,
  onDeleteSavedSearch,
  onSimulateNewJobAlert,
}) => {
  if (!isOpen) return null;

  const defaultAlertName = `${currentFilters.selectedTitle !== 'All Job Titles' ? currentFilters.selectedTitle : 'Custom Role'} - ${currentFilters.selectedLocation} ($${(currentFilters.minSalary / 1000).toFixed(0)}k+)`;

  const [alertName, setAlertName] = useState(defaultAlertName);
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [minMatchScore, setMinMatchScore] = useState(80);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNewSearch({
      name: alertName.trim() || 'Custom Job Search Alert',
      keywords: currentFilters.searchQuery,
      jobTitle: currentFilters.selectedTitle,
      location: currentFilters.selectedLocation,
      industry: currentFilters.selectedIndustry,
      jobFamily: currentFilters.selectedFamily,
      minSalary: currentFilters.minSalary,
      workModel: currentFilters.workModel,
      alertFrequency: frequency,
      emailAlerts,
      inAppAlerts,
      minMatchScore,
      isActive: true,
    });
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Saved Search & Job Opening Alerts</h2>
              <p className="text-xs text-slate-500">Get notified the instant matching jobs are published</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {createdSuccess && (
          <div className="my-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            Alert saved! You will receive notifications when new matching jobs are posted.
          </div>
        )}

        {/* Section 1: Save current search as alert */}
        <form onSubmit={handleCreate} className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-[#0952c4]" />
              Save Current Search Parameters as Alert
            </h3>
            <span className="text-[11px] text-slate-500">
              Captures current filters
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alert Label / Name
            </label>
            <input
              type="text"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
              placeholder="e.g. Senior AI Product Roles in SF"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0952c4]"
            />
          </div>

          {/* Captured Filter summary badge row */}
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
              Title: <strong>{currentFilters.selectedTitle}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
              Location: <strong>{currentFilters.selectedLocation}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
              Min Salary: <strong>${(currentFilters.minSalary / 1000).toFixed(0)}k+</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
              Model: <strong>{currentFilters.workModel}</strong>
            </span>
          </div>

          {/* Alert Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notification Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
              >
                <option value="instant">Instant (Real-time opening alert)</option>
                <option value="daily">Daily Digest (9:00 AM)</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                AI Match Score Minimum
              </label>
              <select
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
              >
                <option value={70}>70%+ (Any reasonable match)</option>
                <option value={80}>80%+ (Strong Match only)</option>
                <option value={90}>90%+ (Top-tier High Alignment)</option>
              </select>
            </div>
          </div>

          {/* Delivery Channels */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inAppAlerts}
                onChange={(e) => setInAppAlerts(e.target.checked)}
                className="rounded text-[#0952c4] focus:ring-[#0952c4]"
              />
              <span className="flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-slate-400" />
                In-App Notification Center
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-[#0952c4] focus:ring-[#0952c4]"
              />
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Email Alerts (sarah.chen@gmail.com)
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#0952c4] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Create Saved Search Alert
          </button>
        </form>

        {/* Section 2: Existing Saved Searches list */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
            <span>Your Active Job Opening Alerts ({savedSearches.length})</span>
            <span className="text-[11px] font-normal text-slate-400">Click Play to test alert</span>
          </h3>

          <div className="space-y-3">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{search.name}</h4>
                    {search.isActive ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                        Paused
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Frequency: <strong className="capitalize">{search.alertFrequency}</strong> • Min Match: <strong>{search.minMatchScore}%</strong> • New openings found: <strong className="text-[#0952c4]">{search.newMatchesCount}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Test alert trigger button */}
                  <button
                    type="button"
                    onClick={() => onSimulateNewJobAlert(search.name)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
                    title="Simulate a new opening alert right now"
                  >
                    <Zap className="w-3 h-3 text-amber-600" />
                    Test Alert
                  </button>

                  {/* Toggle active button */}
                  <button
                    type="button"
                    onClick={() => onToggleSearchActive(search.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                      search.isActive
                        ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {search.isActive ? 'Pause' : 'Resume'}
                  </button>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => onDeleteSavedSearch(search.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {savedSearches.length === 0 && (
              <p className="text-center py-6 text-xs text-slate-400 italic">
                No saved searches yet. Save your favorite job filters to receive immediate alerts when new jobs open!
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
