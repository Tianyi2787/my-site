export const translateText = async (text) => {
  try {
    // 使用智谱 ChatGLM API
    const response = await fetch('https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_turbo/invoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 14bce1d3f4cacae39d42ac4998d4e053.519e1whM1wLJhnZQ'
      },
      body: JSON.stringify({
        request_id: Date.now().toString(),
        prompt: [
          {
            role: "user",
            content: `请为以下内容生成简洁的中文摘要，突出重点内容：\n\n${text}`
          }
        ],
        temperature: 0.7,
        top_p: 0.7,
        incremental: false
      })
    });

    const data = await response.json();
    return data.data.choices[0].content;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}; 