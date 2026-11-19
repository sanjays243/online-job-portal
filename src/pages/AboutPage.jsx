import React from 'react';
import { reviewsData, platformStats } from '../data/reviewsData';
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Headphones, 
  Award, 
  Star, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="about-page-view">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="banner-pill-badge">Our Mission</span>
          <h1 className="banner-title">About JobHunt</h1>
          <p className="banner-subtitle">
            We are bridging the gap between exceptional career talent and world-class organizations through transparent, efficient hiring technology.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Why Choose Us */}
        <div className="about-main-grid">
          <div className="about-image-column">
            <div className="about-image-wrap">
              <img 
                src="/job-offers-concept.jpg" 
                alt="JobHunt Office Collaboration" 
                className="about-image-element"
                onError={(e) => { e.target.src = '/top-view-desk-concept-with-gray-background_23-2148236825.jpg'; }}
              />
              <div className="experience-badge-floating">
                <h3>10+</h3>
                <p>Years of Talent Excellence</p>
              </div>
            </div>
          </div>

          <div className="about-text-column">
            <span className="section-tag-pill">Why Choose Us?</span>
            <h2 className="heading text-left">Your Trusted Partner in Professional Growth</h2>
            
            <p className="about-paragraph">
              Choosing our job portal means gaining direct access to a vast selection of career opportunities from thoroughly verified employers across diverse modern industries.
            </p>
            <p className="about-paragraph">
              Our user-friendly platform ensures a seamless job search experience, with intelligent job matching that connects you to the best-suited positions based on your unique skills, salary expectations, and scheduling preferences.
            </p>

            <div className="about-features-checklist">
              <div className="about-check-item">
                <CheckCircle2 size={20} className="text-primary" />
                <span>100% verified employer listings with no spam or ghost jobs</span>
              </div>
              <div className="about-check-item">
                <CheckCircle2 size={20} className="text-primary" />
                <span>Transparent compensation ranges and schedule details up front</span>
              </div>
              <div className="about-check-item">
                <CheckCircle2 size={20} className="text-primary" />
                <span>Fast 1-click application workflows and resume dispatch</span>
              </div>
              <div className="about-check-item">
                <CheckCircle2 size={20} className="text-primary" />
                <span>Dedicated 24/7 job seeker and employer assistance</span>
              </div>
            </div>

            <div className="about-cta-row mt-4">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('contact')}
              >
                <span>Contact Our Team</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid mt-5">
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

        {/* Core Pillars */}
        <div className="section pillars-section">
          <div className="section-header-center">
            <span className="section-tag-pill">Core Pillars</span>
            <h2 className="heading">What Sets JobHunt Apart</h2>
            <p className="subheading">Built with love and precision for modern professionals and recruiters.</p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon bg-primary-light text-primary">
                <ShieldCheck size={28} />
              </div>
              <h3>Verified Employers</h3>
              <p>Every hiring organization undergoes strict business verification to ensure genuine, legitimate career vacancies.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon bg-accent-light text-accent">
                <Zap size={28} />
              </div>
              <h3>Instant Applications</h3>
              <p>Apply to multiple positions in seconds with saved resumes, custom cover notes, and real-time application tracking.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon bg-purple-light text-accent-purple">
                <Award size={28} />
              </div>
              <h3>Curated Tech Roles</h3>
              <p>From React front-end development to Python AI pipelines, discover high-demand tech stacks with competitive pay.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon bg-success-light text-success">
                <Headphones size={28} />
              </div>
              <h3>Dedicated Support</h3>
              <p>Our career advisors and support agents are available around the clock to guide your hiring or job search journey.</p>
            </div>
          </div>
        </div>

        {/* Top Reviews Section */}
        <div className="section reviews-section">
          <div className="section-header-center">
            <span className="section-tag-pill">Testimonials</span>
            <h2 className="heading">Top Reviews & Success Stories</h2>
            <p className="subheading">Hear what designers, engineers, and hiring managers say about their experience with JobHunt.</p>
          </div>

          <div className="reviews-grid">
            {reviewsData.map((review) => (
              <div key={review.id} className="review-card-box">
                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={17} 
                      fill={i < Math.floor(review.rating) ? '#f59e0b' : '#e2e8f0'} 
                      color={i < Math.floor(review.rating) ? '#f59e0b' : '#cbd5e1'} 
                    />
                  ))}
                  <span className="rating-digit">{review.rating}</span>
                </div>

                <h4 className="review-title">{review.title}</h4>
                <p className="review-comment">"{review.comment}"</p>

                <div className="review-user-info">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="review-user-avatar"
                    onError={(e) => { e.target.src = '/image-1.jpg'; }}
                  />
                  <div>
                    <h5 className="review-user-name">{review.name}</h5>
                    <span className="review-user-role">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
