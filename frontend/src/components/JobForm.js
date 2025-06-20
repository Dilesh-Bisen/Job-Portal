import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobForm = () => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchJob = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id, fetchJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/jobs/${id}`, job);
      } else {
        await axios.post('http://localhost:5000/api/jobs', job);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Job' : 'Add Job'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={job.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={job.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={job.salary}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default JobForm;