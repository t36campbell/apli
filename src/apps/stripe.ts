import chalk from 'chalk';
import { CONFIG } from '../constants';
import { playwright } from '../playwright';
import { utils } from '../utils';

enum LOCATION {
  AUSTRALIA = 'Australia',
  BELGIUM = 'Belgium',
  BRAZIL = 'Brazil',
  CANADA = 'Canada',
  FRANCE = 'France',
  GERMANY = 'Germany',
  INDIA = 'India',
  INDONESIA = 'Indonesia',
  IRELAND = 'Ireland',
  ISRAEL = 'Israel',
  ITALY = 'Italy',
  JAPAN = 'Japan',
  MALAYSIA = 'Malaysia',
  MEXICO = 'Mexico',
  NEW_ZEALAND = 'New Zealand',
  POLAND = 'Poland',
  PORTUGAL = 'Portugal',
  ROMANIA = 'Romania',
  SINGAPORE = 'Singapore',
  SOUTH_KOREA = 'South Korea',
  SPAIN = 'Spain',
  SWEDEN = 'Sweden',
  SWITZERLAND = 'Switzerland',
  THAILAND = 'Thailand',
  NETHERLANDS = 'The Netherlands',
  UAE = 'UAE',
  UK = 'UK',
  US = 'US',
}

export const stripe = async (url: string) => {
  const { browser, context, page } = await playwright.setup();

  await page.goto(url.endsWith('/apply') ? url : `${url}/apply`);

  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/first name/i)
    .fill(CONFIG.first);
  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/last name/i)
    .fill(CONFIG.last);
  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/email/i)
    .fill(CONFIG.email);
  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/phone/i)
    .fill(CONFIG.phone);
  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/employer/i)
    .fill(CONFIG.employer);

  try {
    const location = CONFIG.address?.country as LOCATION;
    const options = { timeout: 300 };
    await page
      .frameLocator('iframe[title="Greenhouse Job Board"]')
      .getByLabel(/reside/i)
      .selectOption({ label: location.toString() }, options);
    await page
      .frameLocator('iframe[title="Greenhouse Job Board"]')
      .getByLabel(location.toString(), { ...options, exact: true })
      .check();
  } catch {
    const log = console.log;
    const error = `STRIPE LOCATION ${CONFIG.address?.country} NOT SUPPORTED\n`;
    log(chalk.bold.red(error));
    log(chalk.yellow('Try one of these:\n\n'));
    log(chalk.green(`${Object.values(LOCATION).join('\n')}\n`));
  }

  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/authorized/i)
    .selectOption({ label: CONFIG.demographics.authorized ? 'Yes' : 'No' });
  await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/sponsor/i)
    .selectOption({ label: CONFIG.demographics.sponsor ? 'Yes' : 'No' });

  let remote = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/remote/i);
  if (await remote.isVisible()) {
    await remote.selectOption({ index: 1 });
  }
  let gender = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/gender/i);
  if (await gender.isVisible()) {
    await gender.selectOption({ label: CONFIG.demographics.gender });
  }
  let hispanic = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/hispanic/i);
  if (await hispanic.isVisible()) {
    await hispanic.selectOption({
      label: CONFIG.demographics.hispanic ? 'Yes' : 'No',
    });
  }
  let race = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/race/i);
  if (await race.isVisible()) {
    await race.selectOption({ label: 'Two or More Races' });
  }
  let veteran = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/veteran/i);
  if (await veteran.isVisible()) {
    await veteran.selectOption({ index: CONFIG.demographics.veteran ? 2 : 1 });
  }
  let disability = page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByLabel(/disability/i);
  if (await disability.isVisible()) {
    await disability.selectOption({
      index: CONFIG.demographics.disability ? 1 : 2,
    });
  }
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    await page
      .frameLocator('iframe[title="Greenhouse Job Board"]')
      .locator('#resume_fieldset')
      .getByRole('button', { name: /Attach/ })
      .click(),
  ]);

  await fileChooser.setFiles(CONFIG.resume);

  let submit = await page
    .frameLocator('iframe[title="Greenhouse Job Board"]')
    .getByRole('button', { name: /Submit Application/ });

  const button = chalk.underline.cyan('Submit Application');
  console.log(chalk.magenta(`\nWaiting for ${button} to be clicked`));
  await submit.evaluate(playwright.clickListener).catch(utils.logError);

  playwright.teardown(browser, context);
};
