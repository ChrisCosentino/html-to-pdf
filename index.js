const express = require('express');
const { pdfLogic } = require('./pdfLogic');
const { scrapeLogic } = require('./scrapeLogic');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.post('/pdf', cors(), async (req, res) => {
  // pdfLogic(res);

  console.log(req.body);

  if (!req.body?.html) {
    return res.send(`The requested html is empty`);
  }

  // const browser = await puppeteer.launch({
  //   headless: true,
  // });
  const browser = await puppeteer.launch({
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
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
