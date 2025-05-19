const express = require('express');
const app = express();
const port = 3000;

const latestDweets = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/dweet/for/:thing', (req, res) => {
  const { thing } = req.params;
  const data = req.query;

  latestDweets[thing] = {
    created: new Date().toISOString(),
    content: data,
  };

  res.json({
    success: true,
    thing: thing,
    created: latestDweets[thing].created,
    content: data,
  });
});

app.get('/get/latest/dweet/for/:thing', (req, res) => {
  const { thing } = req.params;

  if (!latestDweets[thing]) {
    return res.status(404).json({ error: 'Thing not found' });
  }

  res.json({
    with: [
      {
        thing,
        created: latestDweets[thing].created,
        content: latestDweets[thing].content,
      },
    ],
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor dweet local corriendo en http://localhost:${port}`);
});
