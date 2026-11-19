import React from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Calendar, 
  Users, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export const CompanyDetailPage = ({ slug = 'it-infosys', onNavigate, onOpenApply }) => {
  const { jobs } = useJobs();

  // Find all jobs by this company
  const companyJobs = jobs.filter(
    (j) => (j.companySlug || '').toLowerCase() === slug.toLowerCase() ||
           j.company.toLowerCase().includes(slug.replace('-', ' ').toLowerCase())
  );

  const referenceJob = companyJobs[0] || jobs[0];
  const companyName = referenceJob?.company || 'IT Infosys co.';
  const companyLogo = referenceJob?.companyLogo || '/html-img.jpg';
  const companyInfo = referenceJob?.companyInfo || {
    about: 'Leading technology consulting and global digital solutions enterprise powering modern digital businesses.',
    established: '21-05-2004',
    employees: '253+ working employees',
    headquarters: 'Mumbai, India',
    rating: 4.8
  };

  return (
    <div className="company-detail-page">
      {/* Top Breadcrumb */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <button className="back-link-btn" onClick={() => onNavigate('jobs')}>
            <ArrowLeft size={18} />
            <span>Back to All Jobs</span>
          </button>
        </div>
      </div>

      <div className="container py-4">
        {/* Company Header Card */}
        <div className="company-header-hero-card">
          <div className="company-hero-banner-bg"></div>
          
          <div className="company-hero-main-flex">
            <div className="company-hero-logo-box">
              <img 
                src={companyLogo} 
                alt={companyName} 
                className="company-hero-logo-img"
                onError={(e) => { e.target.src = '/html-img.jpg'; }}
              />
            </div>

            <div className="company-hero-titles">
              <div className="d-flex align-items-center gap-2">
                <h1 className="company-hero-title">{companyName}</h1>
                <CheckCircle2 size={22} className="verified-icon" title="Verified Enterprise" />
              </div>
              <p className="company-hero-sub">
                <MapPin size={16} /> {companyInfo.headquarters}
                <span className="divider-dot">•</span>
                <Globe size={16} />
                <a href={referenceJob?.companyWebsite || '#'} target="_blank" rel="noreferrer" className="website-link">
                  Official Website
                </a>
              </p>
            </div>

            <div className="company-rating-box">
              <div className="star-rating-pill">
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span className="rating-score">{companyInfo.rating || 4.8}</span>
              </div>
              <span className="rating-sub">Company Rating</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="company-stats-strip">
            <div className="company-stat-cell">
              <Briefcase size={20} className="text-primary" />
              <div>
                <strong>{companyJobs.length} Jobs</strong>
                <span>Currently Active</span>
              </div>
            </div>
            <div className="company-stat-cell">
              <Calendar size={20} className="text-primary" />
              <div>
                <strong>Est. {companyInfo.established}</strong>
                <span>Founding Date</span>
              </div>
            </div>
            <div className="company-stat-cell">
              <Users size={20} className="text-primary" />
              <div>
                <strong>{companyInfo.employees}</strong>
                <span>Workforce Size</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Bio */}
        <div className="detail-section-box mt-4">
          <h2 className="detail-box-heading">About {companyName}</h2>
          <p className="company-bio-paragraph">
            {companyInfo.about}
          </p>
          <p className="company-bio-paragraph mt-2">
            We are dedicated to building inclusive, high-performance environments where engineers, creators, and leaders can do their best work. With modern work policies, competitive compensation, and world-class tech tooling, our teams drive innovation across global industries.
          </p>
        </div>

        {/* Jobs They Offer */}
        <div className="company-jobs-section mt-5">
          <div className="section-header-flex">
            <div>
              <span className="section-tag-pill">Current Openings</span>
              <h2 className="heading text-left">Jobs Offered by {companyName}</h2>
              <p className="subheading text-left mb-0">
                Apply directly to open roles currently hiring at this company.
              </p>
            </div>
          </div>

          <div className="jobs-cards-grid mt-4">
            {companyJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                onSelectJob={(id) => onNavigate('job-detail', { id })}
                onApply={(jobItem) => onOpenApply(jobItem)}
                onSelectCompany={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
