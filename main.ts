import puppeteer from 'puppeteer-extra';
import account from './account.json';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
(async () => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set browser info
  page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1600, height: 900 });

  await page.goto('https://www.starmarket.com/foru-guest.html');

  page.setDefaultNavigationTimeout(0);

  // Open sidebar
  const profileSelector = '.menu-nav__profile-button';
  await page.waitForSelector(profileSelector);
  await page.click(profileSelector);

  // Click sidebar
  const sidebarelector = '#sign-in-modal-link';
  await page.waitForSelector(sidebarelector);
  await page.click(sidebarelector);

  // Type in user credentials
  await page.type('#label-email', account.email, { delay: 100 });
  await page.type('#label-password', account.password, { delay: 100 });
  // ! This repeated prompt is necessary due to a Puppeteer bug with await.page.type
  await page.type('#label-email', account.email, { delay: 100 });

  // Click sign in button
  const signInSelector = '#btnSignIn';
  await page.waitForSelector(signInSelector);
  await page.click(signInSelector);

  await page.waitForSelector('.grid-coupon-btn');
  const redeemButtons = await page.$$('.grid-coupon-btn');

  for (let button of redeemButtons) await button.click();

  // let loadMoreButtonSelector = '.load-more';
  // await page.waitForSelector(loadMoreButtonSelector, { timeout: 0 });
  // await page.click(loadMoreButtonSelector);

  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // await browser.close();

  console.log(
    `%c
         ,O,
        ,OOO,
  'oooooOOOOOooooo'
     OOOOOOOOOOO
      Redeemed
       coupons!
       OOOOOOO
      OOOO'OOOO
     OOO'   'OOO
    O'         'O`,
    'font-family:monospace'
  );
})();
