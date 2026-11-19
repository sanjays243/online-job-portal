import React from 'react';
import { useJobs } from '../context/JobContext';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Heart, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';

export const JobCard = ({ job, onSelectJob, onApply, onSelectCompany }) => {
  const { isJobSaved, toggleSaveJob } = useJobs();
  const saved = isJobSaved(job.id);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  const handleCompanyClick = (e) => {
    e.stopPropagation();
    if (onSelectCompany) {
      onSelectCompany(job.companySlug || 'it-infosys');
    }
  };

  return (
    <div className="job-card-box">
      {/* Top row: Company & Posted info + Heart button */}
      <div className="job-card-header">
        <div className="company-info-flex" onClick={handleCompanyClick}>
          <div className="company-logo-wrap">
            <img 
              src={job.companyLogo || './html-img.jpg'} 
              alt={job.company} 
              className="company-logo-img"
              onError={(e) => { e.target.src = './html-img.jpg'; }}
            />
          </div>
          <div>
            <h4 className="company-name-title">
              {job.company}
              <CheckCircle2 size={14} className="verified-icon" title="Verified Employer" />
            </h4>
            <span className="job-posted-time">{job.postedTime}</span>
          </div>
        </div>

        <button 
          className={`save-heart-btn ${saved ? 'saved' : ''}`}
          onClick={handleSaveClick}
          title={saved ? 'Remove from saved' : 'Save job'}
          aria-label="Save Job"
        >
          <Heart size={20} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#64748b'} />
        </button>
      </div>

      {/* Title & Location */}
      <div className="job-card-body" onClick={() => onSelectJob(job.id)}>
        <h3 className="job-title-link">
          {job.title}
        </h3>
        
        <p className="job-location-text">
          <MapPin size={15} className="location-pin" />
          <span>{job.location}</span>
        </p>

        {/* Tags / Pills */}
        <div className="job-tags-row">
          <span className="tag-pill tag-salary">
            <IndianRupee size={13} />
            <span>{job.salary}</span>
          </span>
          <span className="tag-pill tag-type">
            <Briefcase size={13} />
            <span>{job.jobType}</span>
          </span>
          <span className="tag-pill tag-shift">
            <Clock size={13} />
            <span>{job.schedule}</span>
          </span>
        </div>

        {/* Skills Preview */}
        {job.skills && job.skills.length > 0 && (
          <div className="job-skills-preview">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="skill-chip">{skill}</span>
            ))}
            {job.skills.length > 3 && (
              <span className="skill-chip-more">+{job.skills.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="job-card-footer">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onSelectJob(job.id)}
        >
          <span>View Details</span>
          <ArrowUpRight size={15} />
        </button>
        <button 
          className="btn btn-primary btn-sm btn-apply-card"
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
