import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      title: '文本翻译',
      description: '支持多语言实时翻译，快速准确',
      icon: '🔤',
      path: '/tools#translate'
    },
    {
      title: '视频翻译',
      description: '在线视频实时字幕翻译',
      icon: '🎥',
      path: '/tools#video'
    },
    {
      title: '网页大纲',
      description: '自动生成网页内容结构大纲',
      icon: '📑',
      path: '/tools#outline'
    },
    {
      title: '网页总结',
      description: '智能提取网页核心内容',
      icon: '📝',
      path: '/tools#summary'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>欢迎使用我的工具箱</h1>
          <p>一站式解决您的在线工具需求</p>
          <Link to="/tools" className="button">开始使用</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>主要功能</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.path} key={index} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 