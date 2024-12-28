import React, { useState } from 'react';
import { summarizeContent } from '../../../services/summaryService';
import './PageSummarizer.css';

const PageSummarizer = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('请输入网页URL');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // 获取网页内容
      const response = await fetch(url);
      const html = await response.text();
      
      // 解析HTML内容
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 提取主要文本内容
      const content = extractMainContent(doc);
      
      // 生成摘要
      const summaryResult = await summarizeContent(content);
      setSummary(summaryResult);
    } catch (err) {
      setError('无法获取或解析网页内容，请确保URL正确且可访问');
    } finally {
      setIsLoading(false);
    }
  };

  const extractMainContent = (doc) => {
    // 移除脚本、样式等无关内容
    const scripts = doc.getElementsByTagName('script');
    const styles = doc.getElementsByTagName('style');
    [...scripts, ...styles].forEach(elem => elem.remove());

    // 获取主要内容区域
    const mainContent = doc.querySelector('main, article, .content, .main-content') || doc.body;
    
    // 提取文本
    return mainContent.textContent
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000); // 限制长度
  };

  return (
    <div className="page-summarizer">
      <div className="url-input-section">
        <form onSubmit={generateSummary}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="请输入网页URL"
            className="url-input"
          />
          <button 
            type="submit" 
            className="generate-btn"
            disabled={isLoading}
          >
            {isLoading ? '生成中...' : '生成摘要'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="summary-content">
        {summary ? (
          <>
            <div className="summary-header">
              <h3>网页摘要</h3>
              <button 
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(summary)}
              >
                复制摘要
              </button>
            </div>
            <div className="summary-text">
              {summary.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </>
        ) : (
          <div className="placeholder">
            <p>输入网页URL，生成内容摘要</p>
            <small>支持任何可公开访问的网页</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSummarizer; 