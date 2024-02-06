const express = require('express');
const { pdfLogic } = require('./pdfLogic');
const { scrapeLogic } = require('./scrapeLogic');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/pdf', (req, res) => {
  pdfLogic(res);
});

app.get('/scrape', (req, res) => {
  scrapeLogic(res);
});

app.get('/', (req, res) => {
  res.send('Render pupeteer server is up an running');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
