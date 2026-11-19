import React from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { Heart, ArrowLeft, Briefcase, BookmarkX } from 'lucide-react';

export const SavedJobsPage = ({ onNavigate, onOpenApply }) => {
  const { jobs, savedJobIds } = useJobs();
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="saved-jobs-page-view">
      <div className="page-hero-banner">
        <div className="container">
          <span className="banner-pill-badge">My Collection</span>
          <h1 className="banner-title">Saved Job Positions</h1>
          <p className="banner-subtitle">
            Review and apply to the career opportunities you have bookmarked for later.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <Heart size={20} className="text-danger" fill="#ef4444" />
            <h2 className="results-count-text">
              {savedJobs.length} {savedJobs.length === 1 ? 'Job' : 'Jobs'} Saved
            </h2>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('jobs')}>
            <Briefcase size={16} />
            <span>Browse More Jobs</span>
          </button>
        </div>

        {savedJobs.length > 0 ? (
          <div className="jobs-cards-grid">
            {savedJobs.map((job) => (
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
              <BookmarkX size={48} className="text-muted" />
            </div>
            <h3 className="no-jobs-title">No Saved Jobs Yet</h3>
            <p className="no-jobs-desc">
              Whenever you find an interesting position, click the heart icon on the card to save it here for quick access.
            </p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => onNavigate('jobs')}
            >
              Explore Open Positions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
