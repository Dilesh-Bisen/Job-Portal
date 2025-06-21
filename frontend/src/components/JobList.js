import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobItem from './JobItem';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error.message, error.response?.data);
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
      }
    } catch (error) {
      console.error('Error deleting job:', error.message, error.response?.data);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="job-portal-container">
      <header className="portal-header">
        <h1 className="portal-title">CareerSync Job Portal</h1>
        <nav className="portal-nav">
          <Link to="/add" className="nav-button">Post a Job</Link>
        </nav>
      </header>
      <section className="hero-section">
        <div className="hero-content">
          <h2>Find Your Dream Job Today</h2>
          <p>Join top companies hiring now. Explore exciting opportunities!</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>
      <section className="job-list-section">
        <h3 className="section-title">Available Opportunities</h3>
        <div className="job-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobItem key={job._id} job={job} deleteJob={deleteJob} />
            ))
          ) : (
            <p className="no-jobs">No jobs available. Post a new job to get started!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobList;
