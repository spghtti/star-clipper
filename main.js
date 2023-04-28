"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const account_json_1 = __importDefault(require("./account.json"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const isElementVisible = (page, cssSelector) => __awaiter(void 0, void 0, void 0, function* () {
        let visible = true;
        yield page
            .waitForSelector(cssSelector, { visible: true, timeout: 10000 })
            .catch(() => {
            visible = false;
        });
        return visible;
    });
    puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
    const browser = yield puppeteer_extra_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    // Set browser info
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
    yield page.setViewport({ width: 1600, height: 900 });
    yield page.goto('https://www.starmarket.com/foru-guest.html');
    page.setDefaultNavigationTimeout(0);
    // Open sidebar
    const profileSelector = '.menu-nav__profile-button';
    yield page.waitForSelector(profileSelector);
    yield page.click(profileSelector);
    // Click sidebar
    const sidebarelector = '#sign-in-modal-link';
    yield page.waitForSelector(sidebarelector);
    yield page.click(sidebarelector);
    // Type in user credentials
    yield page.type('#label-email', account_json_1.default.email, { delay: 100 });
    yield page.type('#label-password', account_json_1.default.password, { delay: 100 });
    // ! This repeated prompt is necessary due to a Puppeteer bug with await.page.type
    yield page.type('#label-email', account_json_1.default.email, { delay: 100 });
    // Click sign in button
    const signInSelector = '#btnSignIn';
    yield page.waitForSelector(signInSelector);
    yield page.click(signInSelector);
    // Continually load pages until all coupons are shown
    const loadMoreButtonSelector = '.load-more';
    let loadMoreVisible = yield page.waitForSelector(loadMoreButtonSelector, {
        visible: true,
        timeout: 0,
    });
    while (loadMoreVisible) {
        yield page.click(loadMoreButtonSelector).catch(() => { });
        try {
            loadMoreVisible = yield page.waitForSelector(loadMoreButtonSelector, {
                visible: true,
                timeout: 5000,
            });
        }
        catch (err) {
            loadMoreVisible = null;
        }
    }
    // Click all redeem buttons
    yield page.waitForSelector('.grid-coupon-btn');
    const redeemButtons = yield page.$$('.grid-coupon-btn');
    (() => __awaiter(void 0, void 0, void 0, function* () {
        for (let button of redeemButtons)
            yield button.click();
        return Promise.resolve();
    }))();
    yield browser.close();
    console.log(`%c
          .
         ,O,
        ,OOO,
  'oooooOOOOOooooo'
     OOOOOOOOOOO
      Redeemed
       coupons!
       OOOOOOO
      OOOO'OOOO
     OOO'   'OOO
    O'         'O`, 'font-family:monospace');
}))();
