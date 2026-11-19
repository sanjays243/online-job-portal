import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { PostJobPage } from './pages/PostJobPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import './App.css';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);

  const navigateTo = (page, params = null) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (job) => {
    setApplyModalJob(job);
  };

  const handleCloseApply = () => {
    setApplyModalJob(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} onOpenApply={handleOpenApply} />;
      case 'jobs':
        return <JobsPage onNavigate={navigateTo} onOpenApply={handleOpenApply} />;
      case 'job-detail':
        return (
          <JobDetailPage 
            jobId={pageParams?.id || 'job-1'} 
            onNavigate={navigateTo} 
            onOpenApply={handleOpenApply} 
          />
        );
      case 'company':
        return (
          <CompanyDetailPage 
            slug={pageParams?.slug || 'it-infosys'} 
            onNavigate={navigateTo} 
            onOpenApply={handleOpenApply} 
          />
        );
      case 'post-job':
        return <PostJobPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'register':
        return <RegisterPage onNavigate={navigateTo} />;
      case 'saved':
        return <SavedJobsPage onNavigate={navigateTo} onOpenApply={handleOpenApply} />;
      default:
        return <HomePage onNavigate={navigateTo} onOpenApply={handleOpenApply} />;
    }
  };

  return (
    <div className="app-main-wrapper">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      
      <main className="main-content-area">
        {renderCurrentPage()}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Global Application Modal */}
      <ApplyModal 
        job={applyModalJob} 
        isOpen={!!applyModalJob} 
        onClose={handleCloseApply} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <AppContent />
      </JobProvider>
    </AuthProvider>
  );
}
