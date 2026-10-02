import { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import JobStats from '../components/JobStats';

export default function Dashboard() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobsData');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobsData', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (newJob) => setJobs([newJob, ...jobs]);
  const deleteJob = (id) => setJobs(jobs.filter((job) => job.id !== id));
  
  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map((job) => job.id === id ? { ...job, status: newStatus } : job));
  };

  return (
    // pt-4 (üstten çok az boşluk) ve pb-12 (alttan fazla boşluk) ile her şey YUKARI taşındı
    <div className="w-[95%] max-w-[1400px] mx-auto pt-3 pb-12 lg:h-screen flex flex-col lg:overflow-hidden">
      
      {/* mb-4 yapılarak başlığın altındaki boşluk da hafifçe kısıldı */}
      <h1 className="text-2xl lg:text-3xl font-extrabold text-center text-indigo-900 mb-4 tracking-tight shrink-0">
        İş Başvurusu Takip Sistemi
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5 shrink-0">
        <div className="lg:col-span-2">
          <JobForm addJob={addJob} />
        </div>
        <div className="lg:col-span-1">
          <JobStats jobs={jobs} />
        </div>
      </div>

      <div className="flex-1 min-h-0 lg:overflow-hidden flex flex-col">
        <JobList jobs={jobs} deleteJob={deleteJob} updateJobStatus={updateJobStatus} />
      </div>
    </div>
  );
}
