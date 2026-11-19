import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Mail, Lock, User, UserCheck, Building, ArrowRight, AlertCircle } from 'lucide-react';

export const RegisterPage = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Job Seeker'
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }

    const res = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });

    if (res.success) {
      alert(`Registration successful! Welcome to JobHunt, ${formData.name}!`);
      onNavigate('home');
    }
  };

  return (
    <div className="auth-page-view">
      <div className="auth-card-container">
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <Briefcase size={24} className="text-primary" />
          </div>
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle">Join thousands of professionals & top companies on JobHunt</p>
        </div>

        {errorMsg && (
          <div className="auth-error-alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Role Toggle Selector */}
        <div className="role-selector-tabs">
          <button 
            type="button"
            className={`role-tab-btn ${formData.role === 'Job Seeker' ? 'active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, role: 'Job Seeker' }))}
          >
            <User size={16} />
            <span>Job Seeker</span>
          </button>
          <button 
            type="button"
            className={`role-tab-btn ${formData.role === 'Employer' ? 'active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, role: 'Employer' }))}
          >
            <Building size={16} />
            <span>Employer / Recruiter</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form mt-4">
          <div className="form-group">
            <label>Full Name <span>*</span></label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sanjay Sharma"
                className="input input-indented"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address <span>*</span></label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="input input-indented"
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Password <span>*</span></label>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input 
                  type="password" 
                  name="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars"
                  className="input input-indented"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password <span>*</span></label>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="input input-indented"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
            <UserCheck size={18} />
            <span>Complete Registration</span>
          </button>
        </form>

        <div className="auth-footer-prompt mt-4">
          <p>
            Already have an account?{' '}
            <button className="auth-switch-link" onClick={() => onNavigate('login')}>
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
