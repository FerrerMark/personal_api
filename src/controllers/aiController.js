const { getAIResponse } = require('../services/aiService');
const { resumeData } = require('../../data'); 

const askAI = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    const personalInfoText = JSON.stringify(resumeData, null, 2);

    const prompt = `
    You are an AI assistant with access to verified information about John Mark Ferrer. 
    Respond accurately and concisely using only the provided knowledge source. 
    If a question is unrelated to Mark, reply with "That’s outside what I know about John Mark Ferrer." 
    Provide detailed yet clear answers within 80 words. 
    Greet back when greeted, and respond appropriately to expressions like "WOW."

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
