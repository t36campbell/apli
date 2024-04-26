import { playwright } from '../playwright';
import { utils } from '../utils';

export const nvidia = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url.includes('?') ? url.split('?').at(0) : url);

  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('button', { name: 'Use My Last Application' }).click();

  const save = await page.getByRole('button', { name: 'Save and Continue' });

  await page.getByLabel('How Did You Hear About Us?*').click();
  await page.getByText('Website').click();
  await page.getByText('NVIDIA.COM').click();

  //  Review "Information"
  await save.evaluate(playwright.clickListener).catch(e => {
    console.log(e);
  });

  //  Review "My Experience"
  await save.evaluate(playwright.clickListener).catch(e => {
    console.log(e);
  });

  await page.getByLabel('Are you legally authorized to').click();
  await page.getByRole('option', { name: 'Yes' }).locator('div').click();
  await page.getByLabel('No', { exact: true }).check();

  //  Review "Application Questions"
  await save.evaluate(playwright.clickListener).catch(e => {
    console.log(e);
  });

  await page.getByLabel('What is your ethnicity?').click();
  await page.getByText('Two or More Races (Not').click();
  await page.getByLabel('What is your gender? select').click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByLabel('Do you identify as one of the').click();
  await page.getByText('I IDENTIFY AS ONE OR MORE OF').click();

  // MUST ACCEPT TERMS MANUALLY

  //  Review "Voluntary Disclosures"
  await save.evaluate(playwright.clickListener).catch(e => {
    console.log(e);
  });

  await page.getByLabel('Name*').fill('Tyler Campbell');
  await page.getByLabel('Calendar').click();
  await page.getByLabel(/Selected Today/).click();
  await page.getByText('No, I do not have a').click();

  //  Review "Self Identify"
  await save.evaluate(playwright.clickListener).catch(e => {
    console.log(e);
  });

  let submit = await page.getByRole('button', { name: /Submit/ });

  // Wait for submit
  await submit.evaluate(playwright.clickListener).catch(utils.logError);

  playwright.teardown(browser, context);
};
