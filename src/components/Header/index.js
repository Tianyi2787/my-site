import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/tools', label: '工具' },
    { path: '/about', label: '关于' },
    { path: '/contact', label: '联系' }
  ];

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          我的网站
        </Link>
        <nav className="nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 