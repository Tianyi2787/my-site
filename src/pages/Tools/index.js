import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextTranslator from '../../components/Tools/TextTranslator';
import VideoTranslator from '../../components/Tools/VideoTranslator';
import OutlineGenerator from '../../components/Tools/OutlineGenerator';
import PageSummarizer from '../../components/Tools/PageSummarizer';
import './Tools.css';

const Tools = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(getInitialTab());

  function getInitialTab() {
    const hash = location.hash.replace('#', '');
    return ['translate', 'video', 'outline', 'summary'].includes(hash) ? hash : 'translate';
  }

  const tools = [
    { id: 'translate', label: '文本翻译', icon: '🔤', component: TextTranslator },
    { id: 'video', label: '视频翻译', icon: '🎥', component: VideoTranslator },
    { id: 'outline', label: '网页大纲', icon: '📑', component: OutlineGenerator },
    { id: 'summary', label: '网页总结', icon: '📝', component: PageSummarizer }
  ];

  const ActiveComponent = tools.find(tool => tool.id === activeTab)?.component || TextTranslator;

  return (
    <div className="tools-page">
      <div className="container">
        <h1>在线工具</h1>
        <div className="tools-container">
          <div className="tools-sidebar">
            {tools.map(tool => (
              <button
                key={tool.id}
                className={`tool-tab ${activeTab === tool.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tool.id)}
              >
                <span className="tool-icon">{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>
          <div className="tool-content">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 