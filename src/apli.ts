#!/usr/bin/env node

import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { APPLICATIONS, APPS } from './constants';
import { codegen } from './codegen';

const applicationTypes = Object.keys(APPLICATIONS);

const commandHandler = async argv => {
  if (!argv.app || argv.app === 'all') {
    Object.entries(APPLICATIONS).map(([key, value]) => {
      APPS[key].map(async url => await value(url));
    });
  }

  let url = argv.url;
  const application = APPLICATIONS[argv.app];
  url
    ? await application(url)
    : APPS[argv.app].map(async url => await application(url));
};

yargs(hideBin(process.argv))
  .command(
    'to <app> [url]',
    'apply to app',
    (yargs: Argv) => {
      return yargs
        .positional('app', {
          describe: 'type of application',
          choices: ['all', ...applicationTypes],
        })
        .positional('url', {
          describe: 'application source',
          type: 'string',
        });
    },
    commandHandler,
  )
  .command(
    'codegen [url]',
    'runs "playwright codegen" in current browser',
    (yargs: Argv) => {
      return yargs.positional('url', {
        type: 'string',
      });
    },
    async argv => {
      await codegen(argv.url);
    },
  )
  .demandCommand()
  .help()
  .parse();
