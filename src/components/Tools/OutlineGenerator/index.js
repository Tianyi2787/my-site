import React, { useState } from 'react';
import './OutlineGenerator.css';

const OutlineGenerator = () => {
  const [url, setUrl] = useState('');
  const [outline, setOutline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateOutline = async (e) => {
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
      
      // 创建临时DOM解析HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 获取所有标题元素
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      // 构建大纲结构
      const outlineData = headings.map(heading => ({
        level: parseInt(heading.tagName[1]),
        text: heading.textContent.trim(),
        id: heading.id || generateId(heading.textContent)
      }));

      setOutline(outlineData);
    } catch (err) {
      setError('无法获取或解析网页内容，请确保URL正确且可访问');
    } finally {
      setIsLoading(false);
    }
  };

  const generateId = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const renderOutline = (items) => {
    if (!items || items.length === 0) return null;

    return (
      <ul className="outline-list">
        {items.map((item, index) => (
          <li 
            key={index}
            className={`outline-item level-${item.level}`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="outline-generator">
      <div className="url-input-section">
        <form onSubmit={generateOutline}>
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
            {isLoading ? '生成中...' : '生成大纲'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="outline-content">
        {outline ? (
          <>
            <div className="outline-header">
              <h3>网页大纲</h3>
              <button 
                className="copy-btn"
                onClick={() => {
                  const text = outline
                    .map(item => `${'  '.repeat(item.level - 1)}${item.text}`)
                    .join('\n');
                  navigator.clipboard.writeText(text);
                }}
              >
                复制大纲
              </button>
            </div>
            {renderOutline(outline)}
          </>
        ) : (
          <div className="placeholder">
            <p>输入网页URL，生成内容大纲</p>
            <small>支持任何可公开访问的网页</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutlineGenerator; 