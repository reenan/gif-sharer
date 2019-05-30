import puppeteer from 'puppeteer';

let browser, page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    devtools: true,
  });
});

beforeEach (async () => {
  page = await browser.newPage();
});

afterEach (async () => {
  await page.close();
});

afterAll(() => {
  browser.close();
});

/* describe('init correctly', () => {
  test( 'loads', async () => {
    await page.goto('http://0.0.0.0:3000');
  }, 16000);
}); */

