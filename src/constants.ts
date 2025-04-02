import { Apps, Config } from './models';
import { utils } from './utils';

import { amazon } from './apps/amazon';
import { apple } from './apps/apple';
import { cisco } from './apps/cisco';
import { cloudflare } from './apps/cloudflare';
import { github } from './apps/github';
import { google } from './apps/google';
import { meta } from './apps/meta';
import { microsoft } from './apps/microsoft';
import { netflix } from './apps/netflix';
import { nvidia } from './apps/nvidia';
import { okta } from './apps/okta';
import { shopify } from './apps/shopify';
import { square } from './apps/square';
import { stripe } from './apps/stripe';
import { uber } from './apps/uber';
import { x } from './apps/x';

export const APPS = utils.get_config<Apps>('apli.apps.json');

export const APPLICATIONS = {
  amazon,
  apple,
  cisco,
  cloudflare,
  github,
  google,
  meta,
  microsoft,
  netflix,
  nvidia,
  okta,
  shopify,
  square,
  stripe,
  uber,
  x,
};

export const CONFIG = utils.get_config<Config>('apli.config.json');

export const DEFAULT_CDP = 'http://localhost:9222';
export const DEFAULT_TIMEOUT = 3000;
