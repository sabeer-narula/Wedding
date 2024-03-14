const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/completions', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const apiKey = "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";
    const response = await axios.post('https://api.anthropic.com/v1/complete', {
      prompt: req.body.prompt,
      model: req.body.model,
      max_tokens_to_sample: req.body.max_tokens_to_sample,
      temperature: req.body.temperature,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'anthropic-version': '2023-06-01',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error details:', error.response?.data);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});