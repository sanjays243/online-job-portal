import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      alert('Thank you! Your message has been received. Our team will contact you within 24 hours.');
    }, 1500);
  };

  const faqs = [
    {
      q: 'Is JobHunt free for job seekers?',
      a: 'Yes, 100% free! Candidates can search, bookmark jobs, and submit applications directly to employers without any subscription charges.'
    },
    {
      q: 'How fast will companies review my application?',
      a: 'Most verified employers review submissions within 48 to 72 business hours. You will receive email notifications when your application status changes.'
    },
    {
      q: 'How do employers post new vacancies?',
      a: 'Employers can click the "Post Job" button in the navigation, complete our streamlined job detail form, and publish their listing live instantly.'
    },
    {
      q: 'Are all listed companies verified?',
      a: 'Yes, our platform verification team reviews company corporate identification, email domains, and registration details prior to public posting.'
    }
  ];

  return (
    <div className="contact-page-view">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <span className="banner-pill-badge">Get in Touch</span>
          <h1 className="banner-title">Contact Our Team</h1>
          <p className="banner-subtitle">
            Have questions about posting a job, our platform features, or need support? We are here to help!
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Contact Info Cards */}
        <div className="contact-info-cards-grid">
          <div className="contact-info-card">
            <div className="contact-card-icon bg-primary-light text-primary">
              <Phone size={24} />
            </div>
            <h4>Call Us Directly</h4>
            <p className="contact-detail-main">+91 (022) 5550-1928</p>
            <span className="contact-detail-sub">Mon - Fri: 9:00 AM - 6:00 PM IST</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon bg-accent-light text-accent">
              <Mail size={24} />
            </div>
            <h4>Email Support</h4>
            <p className="contact-detail-main">support@jobhunt.com</p>
            <span className="contact-detail-sub">careers@jobhunt.com</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon bg-purple-light text-accent-purple">
              <MapPin size={24} />
            </div>
            <h4>Corporate Headquarters</h4>
            <p className="contact-detail-main">BKC Business Hub, Bandra</p>
            <span className="contact-detail-sub">Mumbai, Maharashtra 400051</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon bg-success-light text-success">
              <Clock size={24} />
            </div>
            <h4>Support Hours</h4>
            <p className="contact-detail-main">24/7 Ticketing</p>
            <span className="contact-detail-sub">Average response under 2 hours</span>
          </div>
        </div>

        {/* Contact Form & FAQs Grid */}
        <div className="contact-main-grid mt-5">
          {/* Form Column */}
          <div className="contact-form-card">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <p className="contact-form-desc">
              Fill out the form below and one of our dedicated career representatives will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="contact-actual-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="e.g. Rahul Verma"
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
                    placeholder="e.g. rahul@example.com"
                    className="input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label>Subject <span>*</span></label>
                  <input 
                    type="text" 
                    name="subject" 
                    required 
                    value={formData.subject} 
                    onChange={handleChange}
                    placeholder="e.g. Question regarding job application"
                    className="input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Your Message <span>*</span></label>
                <textarea 
                  name="message" 
                  rows={5}
                  required 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="How can we assist you today? Please provide as much detail as possible..."
                  className="input textarea"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQs Column */}
          <div className="contact-faqs-col">
            <div className="faqs-header">
              <HelpCircle size={22} className="text-primary" />
              <h3>Frequently Asked Questions</h3>
            </div>

            <div className="faqs-list">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${activeFaq === idx ? 'open' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="faq-question-row">
                    <h4>{faq.q}</h4>
                    <ChevronDown size={18} className="faq-chevron" />
                  </div>
                  {activeFaq === idx && (
                    <div className="faq-answer-row">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick emergency contact box */}
            <div className="quick-help-banner mt-4">
              <h4>Need Urgent Recruiter Assistance?</h4>
              <p>Direct priority line for hiring enterprises & urgent recruitment campaigns.</p>
              <a href="tel:+912255501928" className="btn btn-secondary btn-sm mt-2">
                <Phone size={14} /> Call Priority Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
