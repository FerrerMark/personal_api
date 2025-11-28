require('dotenv').config();
const axios = require('axios');

const getAIResponse = async (question) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(API_KEY)}`;

  try {
    const { data } = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: question }
            ]
          }
        ]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') 
                 || 'No response from Gemini';
    return text;
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    throw new Error('Failed to get response from Gemini');
  }
};

module.exports = { getAIResponse };
