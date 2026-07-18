import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Menu, User, Building, Ban, LayoutDashboard, Building2, Calendar, 
  Tags, FileText, UsersRound, MessageSquare, Lock, LogOut, ChevronDown, ChevronRight 
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Mapping paths to dynamic breadcrumb titles
  const pageTitles = {
    '/': 'home',
    '/admin-panel': 'admin workspace',
    '/dashboard': 'dashboard',
    '/colleges': 'college management',
    '/sessions': 'session management',
    '/complaint-types': 'complaint types',
    '/complaints': 'complaints',
    '/users': 'user management',
    '/blocked-users': 'blocked users',
    '/forum': 'discussion forum',
    '/change-password': 'change password'
  };

  const currentBreadcrumb = pageTitles[currentPath] || '';

  // State for live clock
  const [time, setTime] = useState(new Date());

  // State to manage which sidebar menu is open
  const [openMenus, setOpenMenus] = useState({
    main: false, management: false, users: false, community: false, account: false
  });

  // States to manage sidebar visibility for both Mobile and Desktop
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  // NEW FEATURE: State to manage Profile Dropdown visibility
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Automatically open the correct menu based on the current URL path
  useEffect(() => {
    setOpenMenus({
      main: currentPath === '/' || currentPath === '/dashboard',
      management: ['/colleges', '/sessions', '/complaint-types', '/complaints'].includes(currentPath),
      users: ['/users', '/blocked-users'].includes(currentPath),
      community: currentPath === '/forum',
      account: currentPath === '/change-password'
    });

    // Auto-close mobile sidebar when a user clicks on any link and path changes
    setIsMobileSidebarOpen(false);
  }, [currentPath]);

  // Function to toggle sidebar dropdown menus on click
  const toggleMenu = (menuName) => setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));

  // Function to handle the Hamburger Menu click for both Desktop and Mobile
  const handleSidebarToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
    }
  };

  // Live clock interval
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  // Enforcing strict 12-hour format with AM/PM uppercase for professional look
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formattedDate = time.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  // Boolean to check if dashboard is currently active
  const isDashboardActive = currentPath === '/dashboard' || currentPath === '/';

  return (
    <div className="d-flex vh-100 w-100 position-relative" style={{ backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* =========================================
          MOBILE OVERLAY BACKDROP
          Closes the sidebar when clicked outside
          ========================================= */}
      {isMobileSidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-md-none" 
          style={{ opacity: 0.5, zIndex: 1040 }} 
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* =========================================
          SIDEBAR SECTION
          ========================================= */}
      <aside 
        className={`flex-column h-100 overflow-auto shadow-sm 
          ${isMobileSidebarOpen ? 'd-flex position-fixed top-0 start-0' : 'd-none'} 
          ${isDesktopSidebarOpen ? 'd-md-flex' : 'd-md-none'}
        `} 
        style={{ width: '256px', backgroundColor: '#1e293b', color: '#cbd5e1', zIndex: 1050, transition: '0.3s' }}
      >
        
        {/* Brand Logo & Name */}
        <div className="d-flex align-items-center gap-3 px-4 py-4 border-bottom border-secondary">
          <div className="p-2 rounded" style={{ backgroundColor: '#6366f1' }}>
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white fw-bold m-0" style={{ fontSize: '1.125rem' }}>LNM University</h1>
            <p className="m-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Admin Panel</p>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="flex-grow-1 py-3">
          
          {/* MAIN MENU */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ cursor: 'pointer' }} onClick={() => toggleMenu('main')}>
              <p className="fw-bold m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>MAIN</p>
              {openMenus.main ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            </div>
            {openMenus.main && (
              <div className="mb-3 mt-1">
                <Link to="/dashboard" className={`d-flex align-items-center gap-3 px-4 py-2 text-decoration-none transition-all ${isDashboardActive ? 'text-white' : 'text-secondary'}`}
                  style={{ backgroundColor: isDashboardActive ? '#1e293b' : 'transparent', borderLeft: isDashboardActive ? '4px solid #6366f1' : '4px solid transparent' }}
                >
                  <LayoutDashboard size={20} />
                  <span className="fw-medium">Dashboard</span>
                </Link>
              </div>
            )}
          </div>

          {/* MANAGEMENT MENU */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ cursor: 'pointer' }} onClick={() => toggleMenu('management')}>
              <p className="fw-bold m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>MANAGEMENT</p>
              {openMenus.management ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            </div>
            {openMenus.management && (
              <div className="mb-3 mt-1">
                <NavItem icon={<Building size={20} />} text="College Management" linkTo="/colleges" currentPath={currentPath} />
                <NavItem icon={<Calendar size={20} />} text="Session Management" linkTo="/sessions" currentPath={currentPath} />
                <NavItem icon={<Tags size={20} />} text="Complaint Types" linkTo="/complaint-types" currentPath={currentPath} />
                <NavItem icon={<FileText size={20} />} text="Complaints" linkTo="/complaints" currentPath={currentPath} hasArrow />
              </div>
            )}
          </div>
          
          {/* USERS MENU */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ cursor: 'pointer' }} onClick={() => toggleMenu('users')}>
              <p className="fw-bold m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>USERS</p>
              {openMenus.users ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            </div>
            {openMenus.users && (
              <div className="mb-3 mt-1">
                <NavItem icon={<UsersRound size={20} />} text="User Management" linkTo="/users" currentPath={currentPath} />
                <NavItem icon={<Ban size={20} />} text="Blocked Users" linkTo="/blocked-users" currentPath={currentPath} />
              </div>
            )}
          </div>

          {/* COMMUNITY MENU */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ cursor: 'pointer' }} onClick={() => toggleMenu('community')}>
              <p className="fw-bold m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>COMMUNITY</p>
              {openMenus.community ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            </div>
            {openMenus.community && (
              <div className="mb-3 mt-1">
                <NavItem icon={<MessageSquare size={20} />} text="Discussion Forum" linkTo="/forum" currentPath={currentPath} />
              </div>
            )}
          </div>

          {/* ACCOUNT MENU */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between px-4 py-2" style={{ cursor: 'pointer' }} onClick={() => toggleMenu('account')}>
              <p className="fw-bold m-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>ACCOUNT</p>
              {openMenus.account ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            </div>
            {openMenus.account && (
              <div className="mb-3 mt-1">
                <NavItem icon={<Lock size={20} />} text="Change Password" linkTo="/change-password" currentPath={currentPath} />
              </div>
            )}
          </div>

        </div>

        {/* SIDEBAR LOGOUT BUTTON */}
        <div className="p-3 border-top border-secondary">
          <Link to="/" className="d-flex align-items-center gap-3 px-3 py-2 rounded text-danger text-decoration-none" style={{ transition: '0.2s', borderLeft: '4px solid transparent' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <LogOut size={20} />
            <span className="fw-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* =========================================
          DYNAMIC MAIN CONTENT AREA
          ========================================= */}
      <main className="d-flex flex-column flex-grow-1 h-100 overflow-hidden">
        
        {/* Fixed Top Navbar */}
        <header className="bg-white d-flex align-items-center justify-content-between px-4 border-bottom shadow-sm" style={{ height: '64px' }}>
          <div className="d-flex align-items-center gap-3">
            
            <button 
              className="btn btn-light border-0 p-2 d-flex align-items-center justify-content-center"
              onClick={handleSidebarToggle}
            >
              <Menu size={20} />
            </button>
            
            <div className="fs-5 fw-bold text-dark text-capitalize">
              Admin Panel {currentBreadcrumb && <span className="fw-normal text-muted fs-6 ms-1">/ {currentBreadcrumb}</span>}
            </div>
          </div>
          <div className="d-flex align-items-center gap-4">
            <div className="text-end d-none d-sm-block">
              <p className="fw-bold text-dark m-0" style={{ fontSize: '0.875rem' }}>{formattedTime}</p>
              <p className="text-muted m-0" style={{ fontSize: '0.75rem' }}>{formattedDate}</p>
            </div>
            
            {/* =========================================
                NEW FEATURE: PROFILE DROPDOWN
                ========================================= */}
            <div className="position-relative">
              
              {/* Profile Icon Button */}
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle shadow-sm" 
                style={{ width: '40px', height: '40px', backgroundColor: '#6366f1', color: 'white', cursor: 'pointer' }}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <User size={20} />
              </div>

              {/* Invisible overlay to close dropdown when clicking anywhere outside */}
              {isProfileDropdownOpen && (
                <div 
                  className="position-fixed top-0 start-0 w-100 h-100" 
                  style={{ zIndex: 1040 }} 
                  onClick={() => setIsProfileDropdownOpen(false)}
                ></div>
              )}

              {/* Dropdown Menu Card */}
              {isProfileDropdownOpen && (
                <div 
                  className="position-absolute bg-white border shadow-sm rounded" 
                  style={{ top: '55px', right: '0', width: '240px', zIndex: 1050 }}
                >
                  {/* Admin Details Section */}
                  <div className="d-flex flex-column align-items-center p-4 border-bottom">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px', backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                       <User size={32} />
                    </div>
                    <h6 className="mb-0 fw-bold text-dark">Arpit Rai</h6>
                    <small className="text-muted mb-2">admin@lnmuniversity.ac.in</small>
                    <span className="badge px-3 py-1" style={{ backgroundColor: '#10b981', fontSize: '0.75rem' }}>Super Admin</span>
                  </div>
                  
                  {/* Action Links */}
                  <div className="p-2">
                    <Link 
                      to="/change-password" 
                      className="d-flex align-items-center gap-3 px-3 py-2 rounded text-dark text-decoration-none"
                      style={{ transition: '0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Lock size={16} className="text-muted" />
                      <span className="fw-medium" style={{ fontSize: '0.875rem' }}>Change Password</span>
                    </Link>
                    
                    <Link 
                      to="/" 
                      className="d-flex align-items-center gap-3 px-3 py-2 mt-1 rounded text-danger text-decoration-none"
                      style={{ transition: '0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <LogOut size={16} />
                      <span className="fw-medium" style={{ fontSize: '0.875rem' }}>Logout</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Outlet acts as a placeholder for nested route components */}
        <div className="flex-grow-1 p-4 p-md-5 overflow-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

// Reusable Sub-component for Sidebar Navigation Items
const NavItem = ({ icon, text, hasArrow, linkTo, currentPath }) => {
  const isActive = currentPath === linkTo;
  return (
    <Link 
      to={linkTo} 
      className={`d-flex align-items-center justify-content-between px-4 py-2 text-decoration-none transition-all ${isActive ? 'text-white' : ''}`}
      style={{ 
        color: isActive ? '#ffffff' : '#94a3b8', 
        backgroundColor: isActive ? '#1e293b' : 'transparent',
        borderLeft: isActive ? '4px solid #6366f1' : '4px solid transparent'
      }}
    >
      <div className="d-flex align-items-center gap-3">
        {icon}
        <span className="fw-medium" style={{ fontSize: '0.875rem' }}>{text}</span>
      </div>
      {hasArrow && <span style={{ fontSize: '0.75rem' }}>›</span>}
    </Link>
  );
};

export default AdminLayout;