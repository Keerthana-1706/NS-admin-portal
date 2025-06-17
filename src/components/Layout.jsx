// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

// --- Style definitions ---
const navStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#1f1f1f',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #444',
    height: '60px', // Set a fixed height
};

const linkStyle = {
    color: '#f0f0f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.2s'
};

const navLinksStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
};

const logoutButtonStyle = {
    ...linkStyle,
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
};
// --- End of style definitions ---


const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Use sessionStorage to match your existing logic
        sessionStorage.removeItem('adminAuthenticated'); 
        navigate('/admin/login');
    };

    return (
        <div>
            <nav style={navStyle}>
                <Link to="/admin/dashboard" style={{...linkStyle, fontSize: '1.2rem', fontWeight: 'bold'}}>
                    Admin Panel
                </Link>
                
                <div style={navLinksStyle}>
                    <Link to="/admin/website" style={linkStyle}>Website Content</Link>
                    <Link to="/admin/mail" style={linkStyle}>Mail Content</Link>
                    <button onClick={handleLogout} style={logoutButtonStyle}>
                        Logout
                    </button>
                </div>
            </nav>

            <main>
                {/* This Outlet will render the simplified AdminDashboard content below */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;