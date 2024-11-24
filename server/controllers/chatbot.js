const Groq = require('groq-sdk');

const groq = new Groq();

exports.processChatbotPrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt in the request body.' });
  }

  try {
    console.log('Received prompt:', prompt);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const response = chatCompletion.choices[0]?.message?.content || "";

    if (!response) {
      return res.status(500).json({ error: 'No response received from the AI model.' });
    }

    res.status(200).json({ response: response.trim() });
  } catch (error) {
    console.error('Error processing chatbot prompt:', error);
    res.status(500).json({ error: 'Error processing chatbot prompt.' });
  }
};
