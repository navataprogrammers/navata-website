// File: components/careers/JobsByDepartment.js
import React from 'react';
import Link from 'next/link';
import AnimateOnScroll from '../AnimateonScroll';

const JobsByDepartment = ({ jobs }) => {
  const grouped = jobs.reduce((acc, job) => {
    const department = job.department.trim();
    if (!acc[department]) acc[department] = [];
    acc[department].push(job);
    return acc;
  }, {});

  return (
    <div className="careers-jobs-grid">
      {Object.entries(grouped).map(([department, deptJobs]) => (
        <div key={department} className="careers-job-card">
          <AnimateOnScroll className="careers-fade-in-up">
            <h3 className="careers-job-title">{department}</h3>
            <ul className="department-job-list">
              {deptJobs.map(job => (
                <li key={job.id}>
                <Link href={`/careers/job/${job.juid}`} className="department-job-item">
                  {job.title}
                </Link>
              </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      ))}
    </div>
  );
};

export default JobsByDepartment;