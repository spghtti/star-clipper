import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set browser info
  page.setUserAgent(
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1600, height: 900 });

  await page.goto('https://www.starmarket.com/foru-guest.html');

  // Open sidebar
  const profileSelector = '.menu-nav__profile-button';
  await page.waitForSelector(profileSelector);
  await page.click(profileSelector);

  // Click sidebar
  const sidebarelector = '#sign-in-modal-link';
  await page.waitForSelector(sidebarelector);
  await page.click(sidebarelector);

  // Type in user credentials
  await page.type('#label-email', process.env.EMAIL_ADDRESS, { delay: 200 });
  await page.type('#label-password', process.env.PASSWORD, { delay: 200 });
  // ! This repeated prompt is necessary due to a Puppeteer bug with await.page.type
  await page.type('#label-email', process.env.EMAIL_ADDRESS, { delay: 200 });

  // Click sign in button
  const signInSelector = '#btnSignIn';
  await page.waitForSelector(signInSelector);
  await page.click(signInSelector);

  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.close();

  console.log(
    `%c ________________________________________
       ,O,
      ,OOO,
'oooooOOOOOooooo'
  OOOOOOOOOOO
     OOOOOOO
    OOOO'OOOO
   OOO'   'OOO
  O'         'O`,
    'font-family:monospace'
  );
})();
