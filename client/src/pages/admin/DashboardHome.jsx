import React, { useState } from 'react';
import { Users, AlertCircle, Clock, CheckCircle2, Building2, Ban, FileText } from 'lucide-react';

const DashboardHome = () => {
  // Initializing all stats to 0 as the project starts fresh
  const [stats, setStats] = useState({
    totalUsers: 0,
    notProcessed: 0,
    pending: 0,
    closed: 0,
    totalColleges: 0,
    blockedUsers: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form submission and update dashboard stats
  const handleSubmitComplaint = () => {
    // Incrementing stats to simulate real-time updates
    setStats(prev => ({
      ...prev,
      pending: prev.pending + 1,
      notProcessed: prev.notProcessed + 1
    }));
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark">Dashboard Overview</h2>
          <p className="text-muted">Welcome back, Arpit Rai. Here is your university summary.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-success d-flex align-items-center gap-2">
          <FileText size={18} /> Register User Complaint
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="row g-4">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users size={24} />} color="#6366f1" />
        <StatCard title="Not Processed" value={stats.notProcessed} icon={<AlertCircle size={24} />} color="#f59e0b" />
        <StatCard title="Pending" value={stats.pending} icon={<Clock size={24} />} color="#ef4444" />
        <StatCard title="Closed" value={stats.closed} icon={<CheckCircle2 size={24} />} color="#10b981" />
        <StatCard title="Total Colleges" value={stats.totalColleges} icon={<Building2 size={24} />} color="#0ea5e9" />
        <StatCard title="Blocked Users" value={stats.blockedUsers} icon={<Ban size={24} />} color="#64748b" />
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <ComplaintModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleSubmitComplaint} 
        />
      )}
    </>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center gap-3">
      <div className="p-3 rounded-circle" style={{ backgroundColor: `${color}20`, color: color }}>
        {icon}
      </div>
      <div>
        <h6 className="text-muted mb-0">{title}</h6>
        <h3 className="fw-bold mb-0">{value}</h3>
      </div>
    </div>
  </div>
);

// Updated Complaint Registration Modal with comprehensive fields
const ComplaintModal = ({ onClose, onSubmit }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
       style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}>
    <div className="bg-white rounded shadow-lg p-4" style={{ width: '500px', maxWidth: '90%' }}>
      <h4 className="fw-bold mb-4">Register New Complaint</h4>
      
      {/* User ID Field */}
      <div className="mb-3">
        <label className="small fw-semibold text-muted">User/Student ID</label>
        <input type="text" className="form-control" placeholder="e.g., LNM-12345" />
      </div>

      {/* Complaint Category Dropdown */}
      <div className="mb-3">
        <label className="small fw-semibold text-muted">Complaint Category</label>
        <select className="form-select">
          <option value="">Select a category</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="library">Library Services</option>
          <option value="exam">Examination Department</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Detailed Description Field */}
      <div className="mb-3">
        <label className="small fw-semibold text-muted">Description</label>
        <textarea className="form-control" rows="3" placeholder="Explain the issue in detail..."></textarea>
      </div>

      {/* Form Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button onClick={onClose} className="btn btn-light px-4">Cancel</button>
        <button onClick={onSubmit} className="btn btn-primary px-4" style={{ backgroundColor: '#6366f1' }}>Submit Complaint</button>
      </div>
    </div>
  </div>
);

export default DashboardHome;