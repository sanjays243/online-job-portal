import React, { useState, useMemo } from 'react';
import { useJobs } from '../context/JobContext';
import { JobFilter } from '../components/JobFilter';
import { JobCard } from '../components/JobCard';
import { Briefcase, SlidersHorizontal, ArrowUpDown, Frown } from 'lucide-react';

export const JobsPage = ({ onNavigate, onOpenApply }) => {
  const { jobs, filters, resetFilters } = useJobs();
  const [sortBy, setSortBy] = useState('latest');

  // Filtered jobs memoized
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Title / Keyword match
      if (filters.title) {
        const query = filters.title.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(query));
        const matchesCat = job.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesCat) {
          return false;
        }
      }

      // Location match
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Category match
      if (filters.category) {
        if (job.category !== filters.category) {
          return false;
        }
      }

      // Job Type match
      if (filters.jobType) {
        if (job.jobType.toLowerCase() !== filters.jobType.toLowerCase()) {
          return false;
        }
      }

      // Shift / Schedule match
      if (filters.schedule) {
        if (!job.schedule.toLowerCase().includes(filters.schedule.toLowerCase())) {
          return false;
        }
      }

      // Date posted match
      if (filters.datePosted) {
        if (filters.datePosted === 'today' && job.dateCategory !== 'today') {
          return false;
        }
        if (filters.datePosted === '3 days ago' && !['today', '3 days ago'].includes(job.dateCategory)) {
          return false;
        }
      }

      // Salary match
      if (filters.salaryRange) {
        const raw = job.salaryRaw || 0;
        if (filters.salaryRange === '10k' && raw > 15000) return false;
        if (filters.salaryRange === '25k' && (raw < 10000 || raw > 25000)) return false;
        if (filters.salaryRange === '50k' && (raw < 25000 || raw > 50000)) return false;
        if (filters.salaryRange === '100k' && (raw < 50000 || raw > 100000)) return false;
        if (filters.salaryRange === 'high' && raw < 100000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary-high') {
        return (b.salaryRaw || 0) - (a.salaryRaw || 0);
      }
      if (sortBy === 'salary-low') {
        return (a.salaryRaw || 0) - (b.salaryRaw || 0);
      }
      return 0; // Default order is latest
    });
  }, [jobs, filters, sortBy]);

  return (
    <div className="jobs-page-view">
      {/* Top Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="banner-pill-badge">Job Board</span>
          <h1 className="banner-title">Explore All Available Jobs</h1>
          <p className="banner-subtitle">
            Find the right position for your skillset from our database of verified companies.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Filter Section */}
        <JobFilter />

        {/* Results Bar */}
        <div className="jobs-results-header">
          <div className="results-count-wrap">
            <Briefcase size={20} className="text-primary" />
            <h2 className="results-count-text">
              Showing <span className="text-primary font-bold">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
            </h2>
          </div>

          <div className="results-sort-wrap">
            <span className="sort-label">
              <ArrowUpDown size={15} /> Sort By:
            </span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="latest">Most Recent</option>
              <option value="salary-high">Salary: High to Low</option>
              <option value="salary-low">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Jobs List / Grid */}
        {filteredJobs.length > 0 ? (
          <div className="jobs-cards-grid mt-4">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                onSelectJob={(id) => onNavigate('job-detail', { id })}
                onApply={(jobItem) => onOpenApply(jobItem)}
                onSelectCompany={(slug) => onNavigate('company', { slug })}
              />
            ))}
          </div>
        ) : (
          <div className="no-jobs-found-box">
            <div className="no-jobs-icon-wrap">
              <Frown size={48} className="text-muted" />
            </div>
            <h3 className="no-jobs-title">No Jobs Match Your Filters</h3>
            <p className="no-jobs-desc">
              Try adjusting your search criteria, clearing specific filters, or checking back soon as new jobs are added daily.
            </p>
            <button 
              className="btn btn-primary mt-3"
              onClick={resetFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
