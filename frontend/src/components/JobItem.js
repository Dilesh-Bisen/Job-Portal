import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobItem = ({ job, deleteJob }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteJob(job._id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="job-item">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <Link to={`/edit/${job._id}`}>
        <button className="edit">Edit</button>
      </Link>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
      {showConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete "{job.title}"?</p>
            <button className="confirm-button" onClick={confirmDelete}>
              Yes, Delete
            </button>
            <button className="cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobItem;