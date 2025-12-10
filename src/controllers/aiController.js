const { getAIResponse } = require('../services/aiService');
const { resumeData } = require('../../data'); 

const askAI = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    const personalInfoText = JSON.stringify(resumeData, null, 2);

    const prompt = `
    You are an AI assistant with verified information about John Mark Ferrer. 
    Use the provided knowledge source to form accurate, professional answers. 
    If asked for opinions (e.g., “Does he deserve to be hired?”), infer based on his skills, experience, and achievements from the data. 
    If a question is unrelated to him, reply with "That’s outside what I know about John Mark Ferrer." 
    Keep responses under 80 words, clear, and friendly.

    Knowledge Source:
    ${personalInfoText}

    User Question:
    ${question}`;


    const answer = await getAIResponse(prompt);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
};

module.exports = { askAI };
