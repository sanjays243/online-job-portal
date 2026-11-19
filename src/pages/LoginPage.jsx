import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Mail, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(email, password);
    if (res.success) {
      onNavigate('home');
    } else {
      setErrorMsg(res.message || 'Invalid email or password.');
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'employer') {
      setEmail('recruiter@cisco.com');
      setPassword('password123');
      login('recruiter@cisco.com', 'password123');
    } else {
      setEmail('seeker@jobhunt.com');
      setPassword('password123');
      login('seeker@jobhunt.com', 'password123');
    }
    onNavigate('home');
  };

  return (
    <div className="auth-page-view">
      <div className="auth-card-container">
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <Briefcase size={24} className="text-primary" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your JobHunt account to continue your career journey</p>
        </div>

        {errorMsg && (
          <div className="auth-error-alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Demo Quick Logins */}
        <div className="demo-accounts-pillbox">
          <div className="demo-pill-title">
            <Sparkles size={14} className="text-amber" />
            <span>1-Click Quick Demo Sign In:</span>
          </div>
          <div className="demo-buttons-row">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleDemoLogin('seeker')}
            >
              Demo Job Seeker
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleDemoLogin('employer')}
            >
              Demo Employer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form mt-4">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input input-indented"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label>Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset password link sent to your email.'); }} className="forgot-password-link">
                Forgot password?
              </a>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-indented"
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
            <LogIn size={18} />
            <span>Sign In to Account</span>
          </button>
        </form>

        <div className="auth-footer-prompt mt-4">
          <p>
            Don't have an account?{' '}
            <button className="auth-switch-link" onClick={() => onNavigate('register')}>
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
