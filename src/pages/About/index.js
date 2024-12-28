import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>关于我们</h1>
        
        <section className="about-section">
          <h2>网站介绍</h2>
          <p>这是一个集成了多种实用工具的在线平台，旨在提供便捷的文本处理、视频翻译、内容分析等功能。我们致力于为用户提供高效、易用的在线工具。</p>
        </section>

        <section className="about-section">
          <h2>主要功能</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>文本翻译</h3>
              <p>支持多语言实时翻译，快速准确地将文本翻译成目标语言。</p>
            </div>
            <div className="feature-item">
              <h3>视频翻译</h3>
              <p>自动识别视频字幕并进行实时翻译，支持多种视频平台。</p>
            </div>
            <div className="feature-item">
              <h3>网页大纲</h3>
              <p>智能分析网页结构，���成清晰的内容大纲，方便内容导航。</p>
            </div>
            <div className="feature-item">
              <h3>网页总结</h3>
              <p>使用AI技术提取网页核心内容，生成简洁的内容摘要。</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>技术支持</h2>
          <p>本网站使用现代化的Web技术构建，采用React框架开发，并集成了多个AI接口，为用户提供智能化的服务体验。</p>
        </section>
      </div>
    </div>
  );
};

export default About; 