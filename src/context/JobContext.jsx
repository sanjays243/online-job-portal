import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobsData } from '../data/jobsData';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    try {
      const stored = localStorage.getItem('jobhunt_jobs');
      return stored ? JSON.parse(stored) : initialJobsData;
    } catch {
      return initialJobsData;
    }
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const stored = localStorage.getItem('jobhunt_saved_jobs');
      return stored ? JSON.parse(stored) : ['job-1', 'job-3'];
    } catch {
      return ['job-1', 'job-3'];
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem('jobhunt_applications');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Filter criteria state
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    category: '',
    jobType: '',
    schedule: '',
    datePosted: '',
    salaryRange: ''
  });

  useEffect(() => {
    localStorage.setItem('jobhunt_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobhunt_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('jobhunt_applications', JSON.stringify(applications));
  }, [applications]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  const postJob = (newJobData) => {
    const newJob = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedTime: 'Just now',
      dateCategory: 'today',
      featured: true,
      openings: Number(newJobData.openings) || 1,
      companyWebsite: newJobData.companyWebsite || 'https://company.example.com',
      companyLogo: newJobData.companyLogo || '/html-img.jpg',
      benefits: newJobData.benefits || ['Flexible work hours', 'Healthcare', 'Learning budget'],
      requirements: newJobData.requirements || [
        { label: 'Education', value: newJobData.education || "Bachelor's degree" },
        { label: 'Experience', value: newJobData.experience || '2+ years' }
      ],
      qualifications: newJobData.qualifications || [
        `Demonstrated experience in ${newJobData.title}`,
        'Strong problem-solving and collaboration skills'
      ],
      skills: Array.isArray(newJobData.skills)
        ? newJobData.skills
        : (newJobData.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      companyInfo: {
        about: `${newJobData.company} is an innovative organization offering high impact career opportunities.`,
        established: '2020',
        employees: '50-200 employees',
        headquarters: newJobData.location || 'India',
        rating: 4.8
      }
    };

    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const applyJob = (jobId, applicantData) => {
    const job = jobs.find((j) => j.id === jobId);
    const newApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job?.title || 'Unknown Job',
      company: job?.company || 'Company',
      appliedAt: new Date().toLocaleDateString(),
      status: 'Under Review',
      ...applicantData
    };
    setApplications((prev) => [newApplication, ...prev]);
    return true;
  };

  const getJobById = (id) => {
    return jobs.find((j) => j.id === id);
  };

  const resetFilters = () => {
    setFilters({
      title: '',
      location: '',
      category: '',
      jobType: '',
      schedule: '',
      datePosted: '',
      salaryRange: ''
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobIds,
        applications,
        filters,
        setFilters,
        resetFilters,
        toggleSaveJob,
        isJobSaved,
        postJob,
        applyJob,
        getJobById
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
