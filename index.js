const express = require('express');
const { pdfLogic } = require('./pdfLogic');
const { scrapeLogic } = require('./scrapeLogic');
const { puppeteer } = require('puppeteer');

const app = express();

const PORT = process.env.PORT || 4000;

app.post('/pdf', async (req, res) => {
  // pdfLogic(res);

  console.log(req.body);

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.setContent(req.body.html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  return res.send(pdfBuffer);
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
