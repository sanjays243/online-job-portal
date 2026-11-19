import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Send
} from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-main">
      <div className="container">
        {/* Top subscription banner */}
        <div className="newsletter-banner">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay Ahead in Your Career</h3>
            <p className="newsletter-desc">Get the freshest job postings and career growth insights delivered weekly.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <div className="newsletter-input-group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-subscribe">
                <span>Subscribe</span>
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* Footer Columns */}
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="logo-wrapper mb-3" onClick={() => onNavigate('home')}>
              <div className="logo-icon-box">
                <Briefcase size={22} className="logo-icon" />
              </div>
              <span className="logo-text">
                Job<span className="logo-accent">Hunt.</span>
              </span>
            </div>
            <p className="footer-about-text">
              The premier online employment portal connecting talented professionals with top tier enterprises and innovative startups worldwide.
            </p>
            <div className="footer-contact-item">
              <MapPin size={16} className="text-accent" />
              <span>BKC Business District, Mumbai, India</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="text-accent" />
              <span>+91 (022) 5550-1928</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="text-accent" />
              <span>careers@jobhunt.com</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('home')}>
                  <ChevronRight size={14} /> Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')}>
                  <ChevronRight size={14} /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')}>
                  <ChevronRight size={14} /> Explore All Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')}>
                  <ChevronRight size={14} /> Saved Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')}>
                  <ChevronRight size={14} /> Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Recruiters */}
          <div className="footer-col">
            <h4 className="footer-col-title">For Employers</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('post-job')}>
                  <ChevronRight size={14} /> Post a Job
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company', { slug: 'it-infosys' })}>
                  <ChevronRight size={14} /> Featured Companies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')}>
                  <ChevronRight size={14} /> Employer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')}>
                  <ChevronRight size={14} /> Create Recruiter Account
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect With Us</h4>
            <p className="footer-social-desc">Follow our channels for daily job updates, hiring drives, and resume tips.</p>
            <div className="social-links-row">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn facebook" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn twitter" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn youtube" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} <span className="text-highlight">JobHunt Inc.</span> All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
