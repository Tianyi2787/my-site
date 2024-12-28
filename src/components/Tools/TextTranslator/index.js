import React, { useState } from 'react';
import { translateText } from '../../../services/translationService';
import './TextTranslator.css';

const TextTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('zh-CN');

  const languages = [
    { code: 'auto', name: '自动检测' },
    { code: 'zh-CN', name: '中文' },
    { code: 'en', name: '英语' },
    { code: 'ja', name: '日语' },
    { code: 'ko', name: '韩语' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await translateText(inputText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (error) {
      console.error('翻译错误:', error);
      alert('翻译失败，请重试');
    }
    setIsLoading(false);
  };

  return (
    <div className="translator-tool">
      <div className="language-controls">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <button className="swap-btn" onClick={() => {
          if (sourceLang !== 'auto') {
            const temp = sourceLang;
            setSourceLang(targetLang);
            setTargetLang(temp);
          }
        }}>
          🔄
        </button>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {languages.filter(lang => lang.code !== 'auto').map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      <div className="translation-area">
        <div className="input-area">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入要翻译的文本"
          />
          <button 
            className="translate-btn"
            onClick={handleTranslate}
            disabled={isLoading}
          >
            {isLoading ? '翻译中...' : '翻译'}
          </button>
        </div>
        <div className="output-area">
          <textarea
            value={translatedText}
            readOnly
            placeholder="翻译结果将显示在这里"
          />
        </div>
      </div>
    </div>
  );
};

export default TextTranslator; 