import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { categoriesData } from '../data/categoriesData';
import { 
  PlusCircle, 
  Building, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PostJobPage = ({ onNavigate }) => {
  const { postJob } = useJobs();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    company: user?.role === 'Employer' ? user.name : 'TechNova Corp',
    companySlug: 'technova',
    companyLogo: '/react-imh.jpg',
    companyWebsite: 'https://technova.example.com',
    location: 'Bengaluru, India',
    category: 'Development & IT',
    salary: '₹35,000 - ₹75,000 / month',
    salaryRaw: 75000,
    jobType: 'Full-time',
    schedule: 'Day shift',
    shift: 'day shift',
    education: "Bachelor's degree",
    experience: '2-4 years',
    openings: 2,
    skills: 'React.js, JavaScript, TailwindCSS, REST APIs',
    benefits: 'Work from home, Health insurance, Performance bonus',
    description: 'We are seeking an enthusiastic engineer to build modern, user-friendly digital interfaces and contribute to high scale web apps.'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = postJob({
      ...formData,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map((b) => b.trim()).filter(Boolean)
    });
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('job-detail', { id: newJob.id });
    }, 1200);
  };

  return (
    <div className="post-job-page-view">
      {/* Top Hero */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="banner-pill-badge">Recruiter Portal</span>
          <h1 className="banner-title">Post a New Job Opening</h1>
          <p className="banner-subtitle">
            Publish your job vacancy to thousands of verified professionals and receive qualified applicants directly.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {submitted ? (
          <div className="post-job-success-card">
            <CheckCircle size={64} className="text-success" />
            <h2>Job Opening Published Successfully!</h2>
            <p>Your listing is now live and searchable by candidates on JobHunt. Redirecting you to your job page...</p>
          </div>
        ) : (
          <div className="post-job-grid-layout">
            {/* Form Column */}
            <div className="post-form-card">
              <div className="form-card-header">
                <PlusCircle size={22} className="text-primary" />
                <div>
                  <h3>Job Information & Hiring Details</h3>
                  <p>Fields with asterisk (*) are required</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="job-submission-form">
                {/* Job Title */}
                <div className="form-group">
                  <label>Job Title <span>*</span></label>
                  <input 
                    type="text" 
                    name="title" 
                    required 
                    value={formData.title} 
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Engineer" 
                    className="input"
                  />
                </div>

                <div className="form-grid-2">
                  {/* Company Name */}
                  <div className="form-group">
                    <label>Company Name <span>*</span></label>
                    <input 
                      type="text" 
                      name="company" 
                      required 
                      value={formData.company} 
                      onChange={handleChange}
                      placeholder="e.g. Acme Tech Solutions" 
                      className="input"
                    />
                  </div>

                  {/* Company Logo Asset */}
                  <div className="form-group">
                    <label>Company Logo Icon</label>
                    <select 
                      name="companyLogo" 
                      value={formData.companyLogo} 
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="/react-imh.jpg">React Tech Logo</option>
                      <option value="/html-img.jpg">HTML / Infosys Logo</option>
                      <option value="/css-img.jpg">CSS / Design Logo</option>
                      <option value="/js-img.jpg">JavaScript Logo</option>
                      <option value="/php-img.jpg">PHP / Cloud Logo</option>
                      <option value="/mysql-img.jpg">MySQL Database Logo</option>
                      <option value="/ruby-img.jpg">Ruby Logo</option>
                      <option value="/java-img.jpg">Java Enterprise Logo</option>
                      <option value="/image-python.jpg">Python AI Logo</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Location */}
                  <div className="form-group">
                    <label>Job Location <span>*</span></label>
                    <input 
                      type="text" 
                      name="location" 
                      required 
                      value={formData.location} 
                      onChange={handleChange}
                      placeholder="e.g. Bengaluru, India or Remote" 
                      className="input"
                    />
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <label>Industry Category <span>*</span></label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange}
                      className="input"
                    >
                      {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Job Type */}
                  <div className="form-group">
                    <label>Employment Type <span>*</span></label>
                    <select 
                      name="jobType" 
                      value={formData.jobType} 
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Fresher">Fresher</option>
                    </select>
                  </div>

                  {/* Schedule */}
                  <div className="form-group">
                    <label>Work Schedule / Shift <span>*</span></label>
                    <select 
                      name="schedule" 
                      value={formData.schedule} 
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="Day shift">Day shift</option>
                      <option value="Night shift">Night shift</option>
                      <option value="Flexible shift">Flexible shift</option>
                      <option value="Fixed shift">Fixed shift</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Salary Display */}
                  <div className="form-group">
                    <label>Salary Package Display <span>*</span></label>
                    <input 
                      type="text" 
                      name="salary" 
                      required 
                      value={formData.salary} 
                      onChange={handleChange}
                      placeholder="e.g. ₹30,000 - ₹60,000 / month" 
                      className="input"
                    />
                  </div>

                  {/* Openings count */}
                  <div className="form-group">
                    <label>Number of Vacancies</label>
                    <input 
                      type="number" 
                      name="openings" 
                      min="1" 
                      max="50"
                      value={formData.openings} 
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                {/* Required Skills */}
                <div className="form-group">
                  <label>Required Skills (Comma separated) <span>*</span></label>
                  <input 
                    type="text" 
                    name="skills" 
                    required 
                    value={formData.skills} 
                    onChange={handleChange}
                    placeholder="e.g. React.js, Node.js, MongoDB, TypeScript" 
                    className="input"
                  />
                </div>

                {/* Benefits */}
                <div className="form-group">
                  <label>Perks & Benefits (Comma separated)</label>
                  <input 
                    type="text" 
                    name="benefits" 
                    value={formData.benefits} 
                    onChange={handleChange}
                    placeholder="e.g. Health insurance, Work from home, Gym membership" 
                    className="input"
                  />
                </div>

                {/* Job Description */}
                <div className="form-group">
                  <label>Detailed Job Description <span>*</span></label>
                  <textarea 
                    name="description" 
                    rows={5}
                    required 
                    value={formData.description} 
                    onChange={handleChange}
                    placeholder="Describe role responsibilities, team dynamics, projects, and growth opportunities..." 
                    className="input textarea"
                  />
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    <PlusCircle size={20} />
                    <span>Publish Job Listing Now</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column */}
            <div className="post-preview-col">
              <div className="live-preview-box">
                <div className="preview-badge-header">
                  <Eye size={16} />
                  <span>Candidate Card Preview</span>
                </div>

                <div className="preview-card-wrap">
                  <div className="job-card-box preview-mode">
                    <div className="job-card-header">
                      <div className="company-info-flex">
                        <div className="company-logo-wrap">
                          <img 
                            src={formData.companyLogo} 
                            alt={formData.company} 
                            className="company-logo-img"
                          />
                        </div>
                        <div>
                          <h4 className="company-name-title">
                            {formData.company || 'Company Name'}
                          </h4>
                          <span className="job-posted-time">Just now</span>
                        </div>
                      </div>
                    </div>

                    <div className="job-card-body">
                      <h3 className="job-title-link">
                        {formData.title || 'Untitled Job Position'}
                      </h3>
                      
                      <p className="job-location-text">
                        <MapPin size={15} className="location-pin" />
                        <span>{formData.location || 'Location'}</span>
                      </p>

                      <div className="job-tags-row">
                        <span className="tag-pill tag-salary">
                          <IndianRupee size={13} />
                          <span>{formData.salary || 'Salary'}</span>
                        </span>
                        <span className="tag-pill tag-type">
                          <Briefcase size={13} />
                          <span>{formData.jobType}</span>
                        </span>
                        <span className="tag-pill tag-shift">
                          <Clock size={13} />
                          <span>{formData.schedule}</span>
                        </span>
                      </div>

                      <div className="job-skills-preview mt-2">
                        {formData.skills.split(',').slice(0, 3).map((s, i) => (
                          <span key={i} className="skill-chip">{s.trim()}</span>
                        ))}
                      </div>
                    </div>

                    <div className="job-card-footer">
                      <button className="btn btn-secondary btn-sm" disabled>
                        <span>View Details</span>
                      </button>
                      <button className="btn btn-primary btn-sm btn-apply-card" disabled>
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="preview-tips-card">
                  <Sparkles size={20} className="text-amber" />
                  <div>
                    <h4>Recruiting Tip</h4>
                    <p>Postings with clear compensation ranges receive up to <strong>3.5x more qualified applications</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
