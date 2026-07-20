import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ==========================================
// 1. PUBLIC PAGES (DUMMY SETUP)
// ==========================================


import AdminLogin from './pages/AdminLogin';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';

// ==========================================
// 2. ADMIN PAGES & LAYOUT
// ==========================================
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import Home from './pages/Home';
import CollegeManagement from './pages/admin/CollegeManagement';
import ComplainType from './pages/admin/ComplainType';
import SessionManagement from './pages/admin/SessionManagement';
import UserPanel from './pages/user/UserDashboard';
import UserDashboard from './pages/user/UserDashboard';

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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/UserLogin" element={<UserLogin />} />

        {/* ADMIN ROUTES (Wrapped with Sidebar Layout) */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* DEFAULT ADMIN ROUTE: Opens a clean workspace without loading dashboard data */}
          <Route index element={<DashboardHome />} />

            {/* DASHBOARD ROUTE: Data loads only when explicitly clicked from the sidebar */}
            <Route path='dashboard' element={<DashboardHome />} />

            
            <Route path="colleges" element={<CollegeManagement/>} />
            <Route path="sessions" element={<SessionManagement />} />
            <Route path="complaint-types" element={<ComplainType />} />
            <Route path="complaints" element={<DummyAdminPage pageName="Complaint" />} />
            <Route path="users" element={<DummyAdminPage pageName="User Management" />} />
            <Route path="blocked-users" element={<DummyAdminPage pageName="Blocked Users" />} />

            
          </Route>
//user panel
            <Route path="/user/dashboard" element={<UserDashboard />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;