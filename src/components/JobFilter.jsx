import React from 'react';
import { useJobs } from '../context/JobContext';
import { Search, MapPin, Calendar, IndianRupee, Briefcase, GraduationCap, Clock, RotateCcw } from 'lucide-react';

export const JobFilter = () => {
  const { filters, setFilters, resetFilters } = useJobs();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="filter-card">
      <div className="filter-header-row">
        <div>
          <h3 className="filter-title">Filter Job Openings</h3>
          <p className="filter-subtitle">Narrow down results according to your exact preferences</p>
        </div>
        <button 
          className="btn btn-secondary btn-sm btn-reset-filter"
          onClick={resetFilters}
          title="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="filter-grid-layout">
        {/* Keyword / Title */}
        <div className="filter-item">
          <label className="filter-label">
            <Search size={15} /> Job Title / Keyword
          </label>
          <input 
            type="text" 
            name="title" 
            value={filters.title} 
            onChange={handleChange}
            placeholder="e.g. Developer, Designer, Python" 
            className="filter-input"
          />
        </div>

        {/* Location */}
        <div className="filter-item">
          <label className="filter-label">
            <MapPin size={15} /> Location
          </label>
          <input 
            type="text" 
            name="location" 
            value={filters.location} 
            onChange={handleChange}
            placeholder="e.g. Mumbai, Chennai, Remote" 
            className="filter-input"
          />
        </div>

        {/* Date Posted */}
        <div className="filter-item">
          <label className="filter-label">
            <Calendar size={15} /> Date Posted
          </label>
          <select 
            name="datePosted" 
            value={filters.datePosted} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Any time</option>
            <option value="today">Today</option>
            <option value="3 days ago">Last 3 days</option>
            <option value="7 days ago">Last 7 days</option>
            <option value="10 days ago">Last 10 days</option>
            <option value="30 days ago">Last 30 days</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="filter-item">
          <label className="filter-label">
            <IndianRupee size={15} /> Salary Range
          </label>
          <select 
            name="salaryRange" 
            value={filters.salaryRange} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Any salary</option>
            <option value="10k">Up to ₹10,000 / mo</option>
            <option value="25k">₹10,000 - ₹25,000 / mo</option>
            <option value="50k">₹25,000 - ₹50,000 / mo</option>
            <option value="100k">₹50,000 - ₹1,00,000 / mo</option>
            <option value="high">₹1,00,000+ / mo</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="filter-item">
          <label className="filter-label">
            <Briefcase size={15} /> Job Type
          </label>
          <select 
            name="jobType" 
            value={filters.jobType} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Fresher">Fresher</option>
          </select>
        </div>

        {/* Shift */}
        <div className="filter-item">
          <label className="filter-label">
            <Clock size={15} /> Work Shift
          </label>
          <select 
            name="schedule" 
            value={filters.schedule} 
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Shifts</option>
            <option value="day shift">Day shift</option>
            <option value="night shift">Night shift</option>
            <option value="flexible shift">Flexible shift</option>
            <option value="fixed shift">Fixed shift</option>
          </select>
        </div>
      </div>
    </div>
  );
};
