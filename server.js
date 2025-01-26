import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

const genAi = new GoogleGenerativeAI("AIzaSyAK--VFNXpeywyyh69V-AO9EyHbRFAjJJg");
const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-pro'
});

app.post('/generate', async (req, res) => {
  const { query } = req.body;

  try {
    const r = await model.generateContent(query);
    res.json({ text: r.response.text() });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
