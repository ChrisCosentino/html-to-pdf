const puppeteer = require('puppeteer');

const pdfLogic = (res) => {
  res.send('Hello from pdf');
};

module.exports = { pdfLogic };
