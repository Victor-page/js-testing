const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 28);
  expect(text2).toBe('Anna (28 years old)');
});

// test('should output data-less text', () => {
//   const text = generateText();
//   expect(text).toBe('undefined (undefined years old)');
// });

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=400,714'],
  });
  const page = await browser.newPage();
  await page.goto(
    'file:///C:/Users/H/Desktop/testing-01-starting-setup/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.type('input#age', '23');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Anna (23 years old)');

  // await browser.close();
}, 100000);
