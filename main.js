"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto('https://www.starmarket.com/foru-guest.html');
    // Set screen size
    yield page.setViewport({ width: 1600, height: 900 });
    // Open sidebar
    const profileSelector = '.menu-nav__profile-button';
    yield page.waitForSelector(profileSelector);
    yield page.click(profileSelector);
    // Click sidebar
    const sidebarelector = '#sign-in-modal-link';
    yield page.waitForSelector(sidebarelector);
    yield page.click(sidebarelector);
    // Type in user credentials
    yield page.type('#label-email', process.env.EMAIL_ADDRESS, { delay: 200 });
    yield page.type('#label-password', process.env.PASSWORD, { delay: 200 });
    // ! This repeated prompt is necessary due to a Puppeteer bug with await.page.type
    yield page.type('#label-email', process.env.EMAIL_ADDRESS, { delay: 200 });
    // Click sign in button
    const signInSelector = '#btnSignIn';
    yield page.waitForSelector(signInSelector);
    yield page.click(signInSelector);
    // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //   'text/Customize and automate'
    // );
    // const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);
    // await browser.close();
}))();
