import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { X, CheckCircle, UploadCloud, Briefcase, Building, Send } from 'lucide-react';

export const ApplyModal = ({ job, isOpen, onClose }) => {
  const { applyJob } = useJobs();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    resumeFileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !job) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeFileName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      applyJob(job.id, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        portfolio: formData.portfolio || formData.linkedin,
        resume: formData.resumeFileName || 'Resume_Attached.pdf'
      });
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={handleClose}>
      <div className="modal-container-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-view">
            <div className="success-icon-wrap">
              <CheckCircle size={56} className="text-success" />
            </div>
            <h2 className="success-modal-title">Application Submitted!</h2>
            <p className="success-modal-desc">
              Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been successfully delivered to the hiring team.
            </p>
            <div className="submitted-details-pill">
              <span>Status: <strong>Under Review</strong></span>
              <span>Candidate: <strong>{formData.fullName}</strong></span>
            </div>
            <button className="btn btn-primary btn-lg mt-3" onClick={handleClose}>
              Done & Explore More Jobs
            </button>
          </div>
        ) : (
          <div className="modal-form-view">
            <div className="modal-header-section">
              <div className="modal-job-badge">
                <Briefcase size={16} />
                <span>Job Application</span>
              </div>
              <h2 className="modal-title">Apply for {job.title}</h2>
              <p className="modal-subtitle">
                <Building size={15} /> {job.company} • {job.location}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-application-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input 
                    type="text" 
                    name="fullName" 
                    required 
                    value={formData.fullName} 
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address <span>*</span></label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Phone Number <span>*</span></label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Total Experience <span>*</span></label>
                  <input 
                    type="text" 
                    name="experience" 
                    required 
                    value={formData.experience} 
                    onChange={handleChange}
                    placeholder="e.g. 3 years"
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Portfolio / LinkedIn / GitHub Profile</label>
                <input 
                  type="url" 
                  name="portfolio" 
                  value={formData.portfolio} 
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="input"
                />
              </div>

              {/* Resume upload box */}
              <div className="form-group">
                <label>Upload Resume / CV (PDF or DOC) <span>*</span></label>
                <div className="resume-dropzone">
                  <UploadCloud size={32} className="upload-icon" />
                  <p className="dropzone-text">
                    {formData.resumeFileName ? (
                      <strong className="text-primary">{formData.resumeFileName}</strong>
                    ) : (
                      'Click to browse and upload resume (PDF, DOCX up to 5MB)'
                    )}
                  </p>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileUpload} 
                    className="file-hidden-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Letter / Note to Hiring Manager</label>
                <textarea 
                  name="coverLetter" 
                  rows={3}
                  value={formData.coverLetter} 
                  onChange={handleChange}
                  placeholder="Explain why you are the perfect fit for this position..."
                  className="input textarea"
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
