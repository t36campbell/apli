import path from 'path';
import * as fs from 'fs';

const get_config = <T>(name: string): T => {
  const file = fs.readFileSync(path.resolve(__dirname, `../${name}`), 'utf-8');
  return JSON.parse(file);
};

const logError = e => {
  console.error(e);
};

const regex = (pattern: string, flags?: string) => {
  return new RegExp(pattern, flags);
};

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const utils = {
  regex,
  timeout,
  logError,
  get_config,
};
