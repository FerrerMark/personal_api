const { getAIResponse } = require('../services/aiService');
const { resumeData } = require('../../data'); // adjust path if controller is deeper

const askAI = async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    // Convert resumeData to string
    const personalInfoText = JSON.stringify(resumeData, null, 2);

    // Full prompt with instructions
    const prompt = `Remember that the user's prompt is not from Mark. Maximum of 80 words only. 
You are an AI assistant with access to a knowledge source about John Mark Ferrer. 
If they ask questions not about Mark, just say "I don't know about that". 
Use the following information to answer the user's query accurately and concisely. 
Act like you know him very well. Do detailed answers as much as possible. 
Do not invent or add information beyond what is provided in the knowledge source. 
The knowledge source is provided as raw text from a JavaScript file.

If they greet, greet them back. If they say WOW, respond appropriately.

Knowledge source:
${personalInfoText}

User question: ${question}`;

    const answer = await getAIResponse(prompt);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
};

module.exports = { askAI };
