import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Briefcase, 
  Heart, 
  PlusCircle, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Search, 
  Building2, 
  Info, 
  PhoneCall 
} from 'lucide-react';

export const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { savedJobIds } = useJobs();

  const handleNav = (page, params = null) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        {/* Logo */}
        <div className="logo-wrapper" onClick={() => handleNav('home')}>
          <div className="logo-icon-box">
            <Briefcase size={22} className="logo-icon" />
          </div>
          <span className="logo-text">
            Job<span className="logo-accent">Hunt.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'jobs' ? 'active' : ''}`}
            onClick={() => handleNav('jobs')}
          >
            All Jobs
          </button>
          <button 
            className={`nav-link ${currentPage === 'saved' ? 'active' : ''}`}
            onClick={() => handleNav('saved')}
          >
            <span className="nav-saved-wrapper">
              Saved Jobs
              {savedJobIds.length > 0 && (
                <span className="saved-badge">{savedJobIds.length}</span>
              )}
            </span>
          </button>
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            About Us
          </button>
          <button 
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNav('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA & Account */}
        <div className="nav-actions">
          {/* Post Job Button */}
          <button 
            className="btn btn-post-job"
            onClick={() => handleNav('post-job')}
          >
            <PlusCircle size={18} />
            <span>Post Job</span>
          </button>

          {/* User Account / Auth */}
          {user ? (
            <div className="user-menu-relative">
              <button 
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User account"
              >
                <img 
                  src={user.avatar || '/image-1.jpg'} 
                  alt={user.name} 
                  className="user-avatar"
                />
                <span className="user-display-name">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <p className="user-name-full">{user.name}</p>
                    <p className="user-email-full">{user.email}</p>
                    <span className="badge badge-primary user-role-badge">{user.role}</span>
                  </div>
                  <hr className="dropdown-divider" />
                  <button 
                    className="dropdown-item"
                    onClick={() => handleNav('saved')}
                  >
                    <Heart size={16} />
                    <span>My Saved Jobs ({savedJobIds.length})</span>
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => handleNav('post-job')}
                  >
                    <PlusCircle size={16} />
                    <span>Post a Job</span>
                  </button>
                  <hr className="dropdown-divider" />
                  <button 
                    className="dropdown-item text-danger"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-group">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleNav('login')}
              >
                <UserIcon size={16} />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo-wrapper">
                <Briefcase size={22} className="logo-icon" />
                <span className="logo-text">Job<span className="logo-accent">Hunt.</span></span>
              </div>
              <button 
                className="close-drawer-btn" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <button 
                className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNav('home')}
              >
                <Search size={18} />
                <span>Home</span>
              </button>
              <button 
                className={`mobile-nav-item ${currentPage === 'jobs' ? 'active' : ''}`}
                onClick={() => handleNav('jobs')}
              >
                <Briefcase size={18} />
                <span>All Jobs</span>
              </button>
              <button 
                className={`mobile-nav-item ${currentPage === 'saved' ? 'active' : ''}`}
                onClick={() => handleNav('saved')}
              >
                <Heart size={18} />
                <span>Saved Jobs ({savedJobIds.length})</span>
              </button>
              <button 
                className={`mobile-nav-item ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNav('about')}
              >
                <Info size={18} />
                <span>About Us</span>
              </button>
              <button 
                className={`mobile-nav-item ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNav('contact')}
              >
                <PhoneCall size={18} />
                <span>Contact</span>
              </button>
            </nav>

            <div className="mobile-drawer-actions">
              <button 
                className="btn btn-post-job w-100"
                onClick={() => handleNav('post-job')}
              >
                <PlusCircle size={18} />
                <span>Post a Job Opening</span>
              </button>

              {user ? (
                <button 
                  className="btn btn-secondary w-100 mt-2 text-danger"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Log Out ({user.name})</span>
                </button>
              ) : (
                <button 
                  className="btn btn-outline w-100 mt-2"
                  onClick={() => handleNav('login')}
                >
                  <UserIcon size={18} />
                  <span>Log In / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
