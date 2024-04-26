import { playwright } from '../playwright';
import { utils } from '../utils';

export const cisco = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url.replace('?user=1', ''));

  await page
    .getByRole('complementary')
    .getByRole('button', { name: 'Apply' })
    .click();

  await page.getByLabel('How did you hear about us? *').selectOption('6');

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByLabel('Are you now legally').getByLabel('Yes').check();
  await page
    .getByLabel('Will you require sponsorship')
    .locator('div')
    .filter({ hasText: 'No' })
    .click();
  await page
    .getByLabel('Can you speak fluent English')
    .getByLabel('Yes')
    .check();

  let submit = await page.getByRole('button', { name: /Submit/ });

  // Wait for submit
  await submit.evaluate(playwright.clickListener).catch(utils.logError);

  playwright.teardown(browser, context);
};
