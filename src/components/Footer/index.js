import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>关于网站</h3>
          <p>这是一个集成了多种实用工具的个人网站，旨在提供便捷的在线服务。</p>
        </div>
        <div className="footer-section">
          <h3>快速链接</h3>
          <ul>
            <li><a href="/tools">工具</a></li>
            <li><a href="/about">关于</a></li>
            <li><a href="/contact">联系</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>联系方式</h3>
          <ul>
            <li>邮箱：example@email.com</li>
            <li>GitHub：@yourusername</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 我的网站. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 