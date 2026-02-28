const axios = require('axios');
const config = require('../../config');

const buildPrompt = (topic, difficulty, count) => {
  const difficultyMap = {
    easy: '基础知识',
    medium: '中等难度',
    hard: '较高难度'
  };

  return `你是一位专业的教育专家，请围绕主题"${topic}"生成${count}道${difficultyMap[difficulty]}难度的选择题。

要求：
1. 每道题有4个选项，只有一个正确答案
2. 题目要有趣味性
3. 包含答案解析
4. 返回JSON格式

返回格式：
{
  "questions": [
    {
      "question": "问题内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "A",
      "explanation": "答案解析"
    }
  ]
}`;
};

const parseResponse = (content) => {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('无法解析AI响应');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    if (!result.questions || !Array.isArray(result.questions)) {
      throw new Error('AI响应格式错误');
    }
    
    const answerMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    
    return result.questions.map(q => ({
      ...q,
      answer: typeof q.answer === 'string' ? (answerMap[q.answer.toUpperCase()] ?? q.answer) : q.answer
    }));
  } catch (err) {
    console.error('Parse AI response error:', err);
    return null;
  }
};

const generateQuestions = async (topic, difficulty, count) => {
  try {
    const prompt = buildPrompt(topic, difficulty, count);
    
    const response = await axios.post(config.ai.apiUrl, {
      model: 'ep-20260227172958-mv7qm',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.ai.apiKey}`
      },
      timeout: 300000
    });

    const content = response.data.choices[0].message.content;
    return parseResponse(content);
  } catch (err) {
    console.error('Generate questions error:', err);
    return null;
  }
};

module.exports = {
  generateQuestions,
  buildPrompt,
  parseResponse
};
