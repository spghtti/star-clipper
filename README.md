# star-clipper

## About this project

This program automatically redeems all the coupons on Star Market's site provided if have an account set up already.

## Built With

- [Typescript](https://www.typescriptlang.org/)
- [Puppeteer](https://pptr.dev/)

## Run locally

```
git clone https://github.com/spghtti/star-clipper.git
cd star-clipper
yarn install
```

Before you run the program, **you must add your Star Market account info to account.json**. Then, run the following:

```
yarn start
```

It will automatically open a Chromium window. Wait for it to log in, then complete the captcha. After that, star-clipper will redeem all of the deals before closing.

## Issues

The site displays a captcha on login when using Puppeteer. This requires more user input than ideal and prevents Puppeteer from running in headless mode.

## License

Distributed under the MIT License. See LICENSE.txt for more information.
