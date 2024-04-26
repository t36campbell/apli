import { playwright } from '../playwright';
import { utils } from '../utils';

export const google = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url);

  let submit = await page.getByRole('button', { name: /Submit/ });

  // Wait for submit
  await submit.evaluate(playwright.clickListener).catch(utils.logError);

  playwright.teardown(browser, context);
};
