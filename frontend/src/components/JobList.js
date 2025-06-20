import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobItem from './JobItem';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

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

  return (
    <div>
      <Link to="/add">
        <button>Add New Job</button>
      </Link>
      <div className="job-list">
        {jobs.map((job) => (
          <JobItem key={job._id} job={job} deleteJob={deleteJob} />
        ))}
      </div>
    </div>
  );
};

export default JobList;