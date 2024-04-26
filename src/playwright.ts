import { chromium, Browser, BrowserContext } from 'playwright';
import { utils } from './utils';
import { CONFIG, DEFAULT_CDP, DEFAULT_TIMEOUT } from './constants';

const setup = async () => {
  const connection = CONFIG.settings?.cdp ?? DEFAULT_CDP;
  const browser = await chromium.connectOverCDP(connection);
  const windows = browser.contexts();
  const context = await windows.at(0);
  const page = await context.newPage();

  return {
    browser,
    context,
    page,
  };
};

const teardown = async (browser: Browser, context: BrowserContext) => {
  await utils.timeout(CONFIG.settings?.cdp ?? DEFAULT_TIMEOUT);
  await context.close();
  await browser.close();
};

const clickListener = element => {
  return new Promise(resolve => {
    element.addEventListener('click', event => {
      return resolve(event);
    });
  });
};

export const playwright = {
  setup,
  teardown,
  clickListener,
};
