import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Layers, 
  Building2, 
  DollarSign, 
  Bell, 
  SlidersHorizontal, 
  X, 
  Check, 
  Sparkles,
  ChevronDown,
  Users,
  Clock
} from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  selectedTitle: string;
  selectedLocation: string;
  selectedIndustry: string;
  selectedFamily: string;
  minSalary: number;
  workModel: string;
  sortBy: 'match' | 'salary' | 'recent' | 'applicants';
}

interface JobSearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onOpenSaveSearchModal: () => void;
  savedSearchesCount: number;
  totalJobsCount: number;
  matchedJobsCount: number;
}

export const JobSearchFilterBar: React.FC<JobSearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onOpenSaveSearchModal,
  savedSearchesCount,
  totalJobsCount,
  matchedJobsCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const titleOptions = [
    'All Job Titles',
    'Product Management',
    'AI Product Manager',
    'Principal AI Product Manager',
    'Senior Product Manager',
    'Director of Product',
    'Staff Solutions Architect',
    'Technical Program Manager',
    'AI Engineer & LLM Systems'
  ];

  const locationOptions = [
    'All Locations',
    'San Francisco, CA',
    'New York, NY',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'London, UK',
    'Remote'
  ];

  const industryOptions = [
    'All Industries',
    'Enterprise SaaS & AI',
    'FinTech & Payments',
    'Healthcare & Biotech',
    'E-Commerce',
    'CleanTech & Energy',
    'Cybersecurity'
  ];

  const familyOptions = [
    'All Job Families',
    'Product Management',
    'Architecture & Cloud',
    'Data & Machine Learning',
    'Engineering & DevOps',
    'Design & UX'
  ];

  const workModelOptions = ['All Models', 'Remote', 'Hybrid', 'On-site'];

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.selectedTitle !== 'All Job Titles' ||
    filters.selectedLocation !== 'All Locations' ||
    filters.selectedIndustry !== 'All Industries' ||
    filters.selectedFamily !== 'All Job Families' ||
    filters.minSalary > 140000 ||
    filters.workModel !== 'All Models';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Top Search & Primary Parameter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Keywords Input */}
        <div className="md:col-span-5 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search titles, skills (e.g. GenAI, SaaS, CSPO)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0952c4] focus:bg-white"
          />
        </div>

        {/* Location Dropdown */}
        <div className="md:col-span-4 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4" />
          </span>
          <select
            value={filters.selectedLocation}
            onChange={(e) => onFilterChange({ selectedLocation: e.target.value })}
            aria-label="Filter by job location"
            className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0952c4] focus:bg-white cursor-pointer"
          >
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Action Controls */}
        <div className="md:col-span-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors ${
              showAdvanced || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-[#0952c4]'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#0952c4]" />
            )}
          </button>

          {/* Save Search & Alert Trigger */}
          <button
            type="button"
            onClick={onOpenSaveSearchModal}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-xs"
            title="Save this search and receive new opening alerts"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Save Alert</span>
            <span className="inline sm:hidden">Alert</span>
            {savedSearchesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                {savedSearchesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Drawer (Industries, Families, Salary, Work Model) */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-150">
          {/* Industry Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              Job Industry
            </label>
            <select
              value={filters.selectedIndustry}
              onChange={(e) => onFilterChange({ selectedIndustry: e.target.value })}
              aria-label="Filter by job industry"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0952c4]"
            >
              {industryOptions.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Job Family Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              Job Family
            </label>
            <select
              value={filters.selectedFamily}
              onChange={(e) => onFilterChange({ selectedFamily: e.target.value })}
              aria-label="Filter by job family"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0952c4]"
            >
              {familyOptions.map((fam) => (
                <option key={fam} value={fam}>{fam}</option>
              ))}
            </select>
          </div>

          {/* Minimum Salary Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                Min Base Salary
              </label>
              <span className="text-xs font-bold text-[#0952c4]">
                ${(filters.minSalary / 1000).toFixed(0)}k+
              </span>
            </div>
            <input
              type="range"
              min={140000}
              max={250000}
              step={5000}
              value={filters.minSalary}
              onChange={(e) => onFilterChange({ minSalary: Number(e.target.value) })}
              className="w-full accent-[#0952c4] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$140k</span>
              <span>$190k</span>
              <span>$250k+</span>
            </div>
          </div>

          {/* Work Model Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              Work Model
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {workModelOptions.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => onFilterChange({ workModel: model })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                    filters.workModel === model
                      ? 'bg-[#0952c4] text-white font-semibold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Summary & Sorting Controls */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-900">
            Showing {matchedJobsCount} of {totalJobsCount} openings
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              Clear filters
            </button>
          )}
        </div>

        {/* Sort by pill */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Rank by:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => onFilterChange({ sortBy: 'match' })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filters.sortBy === 'match'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#0952c4]" />
              Best CV Match
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ sortBy: 'salary' })}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filters.sortBy === 'salary'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highest Salary
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ sortBy: 'applicants' })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filters.sortBy === 'applicants'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3 h-3 text-[#0952c4]" />
              Most Applicants
            </button>
            <button
              type="button"
              onClick={() => onFilterChange({ sortBy: 'recent' })}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                filters.sortBy === 'recent'
                  ? 'bg-white text-[#0952c4] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3 h-3 text-slate-400" />
              Newest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
