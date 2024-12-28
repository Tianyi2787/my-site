import React, { useState } from 'react';
import './VideoTranslator.css';

const VideoTranslator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError('请输入视频URL');
      return;
    }

    try {
      setIsTranslating(true);
      setError('');
      
      // 检查是否是YouTube URL
      const videoId = extractYouTubeId(videoUrl);
      if (!videoId) {
        throw new Error('请输入有效的YouTube视频链接');
      }

      // 创建嵌入式播放器
      const embedUrl = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&cc_lang_pref=zh-CN`;
      const playerContainer = document.getElementById('video-player');
      playerContainer.innerHTML = `
        <iframe
          width="100%"
          height="400"
          src="${embedUrl}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTranslating(false);
    }
  };

  const extractYouTubeId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      } else if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
    } catch (err) {
      return null;
    }
    return null;
  };

  return (
    <div className="video-translator">
      <div className="url-input-section">
        <form onSubmit={handleUrlSubmit}>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="请输入YouTube视频链接"
            className="video-url-input"
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isTranslating}
          >
            {isTranslating ? '加载中...' : '加载视频'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div id="video-player" className="video-player">
        <div className="placeholder">
          <p>在上方输入YouTube视频链接以开始翻译</p>
          <small>支持自动字幕翻译功能</small>
        </div>
      </div>

      <div className="instructions">
        <h3>使用说明：</h3>
        <ol>
          <li>输入YouTube视频链接</li>
          <li>点击加载视频</li>
          <li>在视频播放器中点击CC按钮开启字幕</li>
          <li>选择中文字幕（如果可用）</li>
        </ol>
      </div>
    </div>
  );
};

export default VideoTranslator; 