import { playwright } from '../playwright';
import { utils } from '../utils';

export const cloudflare = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url.endsWith('#app') ? url : `${url}#app`);

  await page.getByLabel(/first name/i).fill('Tyler');
  await page.getByLabel(/last name/i).fill('Campbell');
  await page.getByLabel(/email/i).fill('tcampbell3683@gmail.com');
  await page.getByLabel(/phone/i).fill('4403649817');

  let location = page.getByLabel('Location (City)');
  if (await location.isVisible()) {
    location.fill('Wadsworth, Ohio, United States');
    location.click();
    await page.locator('#location_autocomplete-items-popup-option-0').click();
  }
  let legalName = page.getByLabel(/Legal Name */, { exact: true });
  if (await legalName.isVisible()) {
    await legalName.fill('Tyler Campbell');
  }

  let linkedin = page.getByLabel(/LinkedIn Profile/);
  if (await linkedin.isVisible()) {
    await linkedin.fill('https://www.linkedin.com/in/t36campbell/');
  }

  let website = page.getByLabel(/Website/, { exact: true });
  if (await website.isVisible()) {
    await website.fill(
      'https://tylercampbell.space/ https://github.com/t36campbell',
    );
  }

  let sites = page.getByLabel(/would you like to include/i);
  if (await sites.isVisible()) {
    await sites.fill(
      'https://www.linkedin.com/in/t36campbell/ https://tylercampbell.space/ https://github.com/t36campbell',
    );
  }

  await page.getByLabel(/how did you hear about this/i).fill('company website');
  await page.getByLabel(/sponsor/i).selectOption({ label: 'No' });
  await page.getByLabel(/Cloudflare's Candidate Privacy Policy/).check();

  let gender = page.getByLabel(/gender/i);
  if (await gender.isVisible()) {
    await gender.selectOption({ label: 'Male' });
  }
  let hispanic = page.getByLabel(/hispanic/i);
  if (await hispanic.isVisible()) {
    await hispanic.selectOption({ label: 'No' });
  }
  let race = page.getByLabel(/race/i);
  if (await race.isVisible()) {
    await race.selectOption({ label: 'Two or More Races' });
  }
  let veteran = page.getByLabel(/veteran/i);
  if (await veteran.isVisible()) {
    await veteran.selectOption({ index: 2 });
  }
  let disability = page.getByLabel(/disability/i);
  if (await disability.isVisible()) {
    await disability.selectOption({ index: 2 });
  }

  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    await page
      .locator('#resume_fieldset')
      .getByRole('button', { name: /Attach/ })
      .click(),
  ]);

  await fileChooser.setFiles(
    '/Users/tyler/Desktop/projects/apli/assets/Tyler Campbell Resume (2024).pdf',
  );

  let submit = await page.getByRole('button', { name: /Submit Application/ });

  // Wait for submit
  await submit.evaluate(playwright.clickListener).catch(utils.logError);

  playwright.teardown(browser, context);
};
