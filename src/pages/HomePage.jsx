import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { categoriesData, jobTypesData } from '../data/categoriesData';
import { platformStats } from '../data/reviewsData';
import { JobCard } from '../components/JobCard';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Sparkles,
  Building
} from 'lucide-react';

export const HomePage = ({ onNavigate, onOpenApply }) => {
  const { jobs, setFilters } = useJobs();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      title: searchTitle,
      location: searchLocation
    }));
    onNavigate('jobs');
  };

  const handleCategoryClick = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName
    }));
    onNavigate('jobs');
  };

  const handleJobTypeClick = (typeLabel) => {
    setFilters((prev) => ({
      ...prev,
      jobType: typeLabel
    }));
    onNavigate('jobs');
  };

  // 6 latest jobs
  const featuredJobs = jobs.slice(0, 6);

  return (
    <div className="home-page-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-content">
            <div className="hero-pill-badge">
              <Sparkles size={16} className="text-amber" />
              <span>Over 18,500+ Verified Openings Live Today</span>
            </div>
            <h1 className="hero-headline">
              Find Your <span className="text-gradient">Dream Job</span> With Leading Companies
            </h1>
            <p className="hero-description">
              Connect with high-growth startups and Fortune 500 tech leaders. Fast applications, transparent salaries, and verified recruiter profiles.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleHeroSearch} className="hero-search-box">
              <div className="search-input-field">
                <Search size={20} className="search-field-icon" />
                <input 
                  type="text" 
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  placeholder="Job title, skills, or company" 
                  className="hero-field"
                />
              </div>

              <div className="search-divider"></div>

              <div className="search-input-field">
                <MapPin size={20} className="search-field-icon" />
                <input 
                  type="text" 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City, state, or remote" 
                  className="hero-field"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-search-hero">
                <Search size={18} />
                <span>Search Jobs</span>
              </button>
            </form>

            {/* Trending tags */}
            <div className="trending-tags-row">
              <span className="trending-title">
                <TrendingUp size={15} /> Trending:
              </span>
              {['Frontend', 'React.js', 'Python', 'Remote', 'UI/UX Designer', 'PHP'].map((tag) => (
                <button 
                  key={tag} 
                  className="trending-chip"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, title: tag }));
                    onNavigate('jobs');
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img 
                src="./job-offers-concept.jpg" 
                alt="Job Search and Career Growth" 
                className="hero-img-main"
                onError={(e) => { e.target.src = './top-view-desk-concept-with-gray-background_23-2148236825.jpg'; }}
              />
              <div className="floating-stat-card top">
                <div className="floating-stat-icon bg-success-light">
                  <ShieldCheck size={22} className="text-success" />
                </div>
                <div>
                  <h4 className="floating-num">100% Verified</h4>
                  <p className="floating-sub">Trusted Companies</p>
                </div>
              </div>

              <div className="floating-stat-card bottom">
                <div className="floating-stat-icon bg-primary-light">
                  <Zap size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="floating-num">Fast Track</h4>
                  <p className="floating-sub">Direct Interview Calls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM STATS BAR */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {platformStats.map((stat, idx) => (
              <div key={idx} className="stat-item-box">
                <div className="stat-icon-wrapper">
                  <i className={stat.icon}></i>
                </div>
                <div>
                  <h3 className="stat-number">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-pill">Explore Categories</span>
            <h2 className="heading">Popular Job Categories</h2>
            <p className="subheading">
              Browse thousands of active job openings categorized by your preferred professional industry.
            </p>
          </div>

          <div className="categories-grid">
            {categoriesData.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-icon-box" style={{ color: cat.accent, background: `${cat.accent}15` }}>
                  <i className={cat.icon}></i>
                </div>
                <div className="category-details">
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="category-count">{cat.jobsCount}</span>
                  <p className="category-desc">{cat.description}</p>
                </div>
                <ArrowRight size={18} className="category-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK ARRANGEMENTS / JOB TYPES */}
      <section className="section job-types-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag-pill">Work Flexibility</span>
            <h2 className="heading">Work Modes & Schedules</h2>
            <p className="subheading">
              Filter by your ideal lifestyle whether you want remote freedom, full-time security, or internship experience.
            </p>
          </div>

          <div className="job-types-grid">
            {jobTypesData.map((type) => (
              <button 
                key={type.id} 
                className="job-type-card"
                onClick={() => handleJobTypeClick(type.label)}
              >
                <div className="type-icon-box">
                  <i className={type.icon}></i>
                </div>
                <h4 className="type-title">{type.label}</h4>
                <p className="type-count">{type.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST FEATURED JOBS */}
      <section className="section featured-jobs-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-tag-pill">New Openings</span>
              <h2 className="heading text-left">Latest Job Opportunities</h2>
              <p className="subheading text-left mb-0">
                Explore handpicked career opportunities recently listed by verified organizations.
              </p>
            </div>
            <button 
              className="btn btn-secondary btn-explore-all"
              onClick={() => onNavigate('jobs')}
            >
              <span>View All ({jobs.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="jobs-cards-grid mt-4">
            {featuredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onSelectJob={(id) => onNavigate('job-detail', { id })}
                onApply={(jobItem) => onOpenApply(jobItem)}
                onSelectCompany={(slug) => onNavigate('company', { slug })}
              />
            ))}
          </div>

          <div className="center-action-row mt-4">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('jobs')}
            >
              <span>Explore All Jobs</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* RECRUITER CTA BANNER */}
      <section className="recruiter-cta-banner">
        <div className="container recruiter-cta-layout">
          <div className="recruiter-cta-text">
            <h2 className="recruiter-cta-title">Are You Looking to Hire Skilled Talent?</h2>
            <p className="recruiter-cta-desc">
              Publish job listings in minutes, access our verified candidate talent pool, and hire top developers, designers, and managers seamlessly.
            </p>
            <div className="recruiter-cta-buttons">
              <button 
                className="btn btn-white-cta"
                onClick={() => onNavigate('post-job')}
              >
                <Briefcase size={18} />
                <span>Post a Job Free</span>
              </button>
              <button 
                className="btn btn-outline-white-cta"
                onClick={() => onNavigate('about')}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="recruiter-features-col">
            <div className="recruiter-feature-pill">
              <ShieldCheck size={20} className="text-amber" />
              <span>Free instant job distribution</span>
            </div>
            <div className="recruiter-feature-pill">
              <Users size={20} className="text-amber" />
              <span>Targeted candidate matching</span>
            </div>
            <div className="recruiter-feature-pill">
              <Zap size={20} className="text-amber" />
              <span>Direct candidate resume screening</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
