import { playwright } from './playwright';

export const codegen = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url);

  await page.pause();

  playwright.teardown(browser, context);
};
