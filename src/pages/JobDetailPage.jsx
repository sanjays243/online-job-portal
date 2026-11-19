import React from 'react';
import { useJobs } from '../context/JobContext';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Heart, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Users, 
  Check, 
  ExternalLink,
  Share2
} from 'lucide-react';

export const JobDetailPage = ({ jobId, onNavigate, onOpenApply }) => {
  const { getJobById, isJobSaved, toggleSaveJob } = useJobs();
  const job = getJobById(jobId);

  if (!job) {
    return (
      <div className="container py-5 text-center">
        <h2>Job opening not found</h2>
        <p className="text-muted mt-2">The position you are looking for might have closed or expired.</p>
        <button className="btn btn-primary mt-4" onClick={() => onNavigate('jobs')}>
          Back to All Jobs
        </button>
      </div>
    );
  }

  const saved = isJobSaved(job.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this opening for ${job.title} on JobHunt!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  return (
    <div className="job-detail-page">
      {/* Top Breadcrumb navigation */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <button className="back-link-btn" onClick={() => onNavigate('jobs')}>
            <ArrowLeft size={18} />
            <span>Back to All Jobs</span>
          </button>
        </div>
      </div>

      <div className="container py-4">
        {/* Main Job Header Card */}
        <div className="job-hero-card">
          <div className="job-hero-layout">
            <div className="company-logo-large-wrap">
              <img 
                src={job.companyLogo || './html-img.jpg'} 
                alt={job.company}
                className="company-logo-large"
                onError={(e) => { e.target.src = './html-img.jpg'; }}
              />
            </div>

            <div className="job-hero-info">
              <div className="job-meta-top">
                <span className="badge badge-primary">{job.category || 'Technology'}</span>
                <span className="job-posted-time">
                  <Calendar size={14} /> Posted {job.postedTime}
                </span>
              </div>

              <h1 className="job-main-title">{job.title}</h1>

              <div className="job-company-row">
                <button 
                  className="company-name-link"
                  onClick={() => onNavigate('company', { slug: job.companySlug || 'it-infosys' })}
                >
                  <Building2 size={16} />
                  <span>{job.company}</span>
                  <CheckCircle2 size={14} className="verified-icon" />
                </button>
                <span className="divider-dot">•</span>
                <span className="job-location-item">
                  <MapPin size={16} /> {job.location}
                </span>
              </div>

              <div className="job-pill-attributes">
                <span className="tag-pill tag-salary">
                  <IndianRupee size={15} />
                  <span>{job.salary}</span>
                </span>
                <span className="tag-pill tag-type">
                  <Briefcase size={15} />
                  <span>{job.jobType}</span>
                </span>
                <span className="tag-pill tag-shift">
                  <Clock size={15} />
                  <span>{job.schedule}</span>
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="job-hero-actions">
              <button 
                className="btn btn-primary btn-lg btn-apply-hero"
                onClick={() => onOpenApply(job)}
              >
                Apply Now
              </button>

              <div className="hero-sub-actions">
                <button 
                  className={`btn btn-secondary ${saved ? 'text-danger' : ''}`}
                  onClick={() => toggleSaveJob(job.id)}
                >
                  <Heart size={18} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : 'currentColor'} />
                  <span>{saved ? 'Saved' : 'Save Job'}</span>
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={handleShare}
                  title="Share job opening"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="job-content-grid mt-4">
          {/* Main Content Column */}
          <div className="job-main-col">
            {/* Description */}
            <div className="detail-section-box">
              <h3 className="detail-box-heading">Job Description</h3>
              <p className="detail-description-text">{job.description}</p>
              
              <div className="hiring-insights-callout">
                <Users size={18} className="text-primary" />
                <span>Hiring <strong>{job.openings || 2} candidates</strong> for this position.</span>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="detail-section-box">
                <h3 className="detail-box-heading">Key Requirements</h3>
                <div className="requirements-list">
                  {job.requirements.map((req, idx) => (
                    <div key={idx} className="requirement-row">
                      <span className="req-label">{req.label}:</span>
                      <span className="req-value">{req.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qualifications */}
            {job.qualifications && job.qualifications.length > 0 && (
              <div className="detail-section-box">
                <h3 className="detail-box-heading">Qualifications & Criteria</h3>
                <ul className="qualifications-bullet-list">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx}>
                      <Check size={18} className="text-success check-icon" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="detail-section-box">
                <h3 className="detail-box-heading">Required Tech & Skills</h3>
                <div className="skills-tags-cluster">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="skill-pill-large">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="job-sidebar-col">
            {/* Overview Card */}
            <div className="sidebar-info-card">
              <h3 className="sidebar-card-title">Job Overview</h3>
              <div className="overview-item">
                <IndianRupee size={18} className="text-primary" />
                <div>
                  <label>Offered Salary</label>
                  <p>{job.salary}</p>
                </div>
              </div>
              <div className="overview-item">
                <Briefcase size={18} className="text-primary" />
                <div>
                  <label>Employment Type</label>
                  <p>{job.jobType}</p>
                </div>
              </div>
              <div className="overview-item">
                <Clock size={18} className="text-primary" />
                <div>
                  <label>Work Schedule</label>
                  <p>{job.schedule}</p>
                </div>
              </div>
              <div className="overview-item">
                <MapPin size={18} className="text-primary" />
                <div>
                  <label>Location</label>
                  <p>{job.location}</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="sidebar-info-card">
                <h3 className="sidebar-card-title">Perks & Benefits</h3>
                <ul className="benefits-checklist">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* About Company Widget */}
            {job.companyInfo && (
              <div className="sidebar-info-card company-widget">
                <h3 className="sidebar-card-title">About {job.company}</h3>
                <p className="company-widget-about">{job.companyInfo.about}</p>
                
                <div className="company-meta-table">
                  <div className="company-meta-row">
                    <span>Established:</span>
                    <strong>{job.companyInfo.established}</strong>
                  </div>
                  <div className="company-meta-row">
                    <span>Team Size:</span>
                    <strong>{job.companyInfo.employees}</strong>
                  </div>
                  <div className="company-meta-row">
                    <span>Headquarters:</span>
                    <strong>{job.companyInfo.headquarters}</strong>
                  </div>
                </div>

                <button 
                  className="btn btn-secondary w-100 mt-3"
                  onClick={() => onNavigate('company', { slug: job.companySlug || 'it-infosys' })}
                >
                  <span>View Company Profile & Jobs</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
