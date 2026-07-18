import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ==========================================
// 1. PUBLIC PAGES (DUMMY SETUP)
// ==========================================
const Home = () => (
  <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
    <h1 className="mb-4 fw-bold">Welcome to LNM University</h1>
    <p className="text-muted mb-4">This is the public home page.</p>
    
    {/* Button routes to the new default admin panel screen instead of dashboard */}
    <Link to="/admin-panel" className="btn btn-primary px-4 py-2 shadow-sm" style={{ backgroundColor: '#6366f1', border: 'none' }}>
      Open Admin Panel
    </Link>
  </div>
);

import AdminLogin from './pages/AdminLogin';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';

// ==========================================
// 2. ADMIN PAGES & LAYOUT
// ==========================================
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';

// New component for the default empty workspace when Admin Panel is first opened
const AdminWelcomeScreen = () => (
  <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center" style={{ minHeight: '60vh' }}>
    <h2 className="text-dark fw-bold mb-2">Welcome to the Admin Workspace</h2>
    <p className="text-muted">Please select an option from the sidebar to view its content.</p>
  </div>
);

// Reusable dummy component to test sidebar navigation
const DummyAdminPage = ({ pageName }) => (
  <div className="bg-white p-5 rounded border shadow-sm text-center mt-4">
    <h3 className="text-dark fw-bold text-capitalize">{pageName} Content</h3>
    <p className="text-muted">
      This is the {pageName} page.
    </p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/UserLogin" element={<UserLogin />} />

        {/* ADMIN ROUTES (Wrapped with Sidebar Layout) */}
        <Route element={<AdminLayout />}>
          
          {/* DEFAULT ADMIN ROUTE: Opens a clean workspace without loading dashboard data */}
          <Route path="/admin-panel" element={<AdminWelcomeScreen />} />
          
          {/* DASHBOARD ROUTE: Data loads only when explicitly clicked from the sidebar */}
          <Route path="/dashboard" element={<DashboardHome />} />
          
          {/* Other Admin Pages */}
          <Route path="/colleges" element={<DummyAdminPage pageName="College Management" />} />
          <Route path="/sessions" element={<DummyAdminPage pageName="Session Management" />} />
          <Route path="/complaint-types" element={<DummyAdminPage pageName="Complaint Types" />} />
          <Route path="/complaints" element={<DummyAdminPage pageName="Complaints" />} />
          <Route path="/users" element={<DummyAdminPage pageName="User Management" />} />
          <Route path="/blocked-users" element={<DummyAdminPage pageName="Blocked Users" />} />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;