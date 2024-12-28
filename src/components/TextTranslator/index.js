import React, { useState } from 'react';
import { translateText } from '../../services/translationService';
import './TextTranslator.css';

const TextTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await translateText(inputText);
      setTranslatedText(result);
    } catch (error) {
      console.error('翻译错误:', error);
      alert('翻译失败，请重试');
    }
    setIsLoading(false);
  };

  return (
    <div className="card translator">
      <div className="input-area">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要翻译的文本"
        />
        <button 
          className="button translate-btn"
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
  );
};

export default TextTranslator; 