export interface Apps {
  amazon: string[];
  apple: string[];
  cisco: string[];
  cloudflare: string[];
  github: string[];
  google: string[];
  meta: string[];
  microsoft: string[];
  netflix: string[];
  nvidia: string[];
  okta: string[];
  shopify: string[];
  square: string[];
  stripe: string[];
  uber: string[];
  x: string[];
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Demographics {
  authorized: boolean;
  sponsor: boolean;
  gender: 'Decline' | 'Female' | 'Male';
  hispanic: boolean;
  race: string;
  veteran: boolean;
  disability: boolean;
}

interface Preferences {
  remote: boolean;
}

interface Socials {
  github: string;
  linkedin: string;
  website: string;
}

interface Settings {
  cdp: string;
  timeout: number;
}

export interface Config {
  first: string;
  last: string;
  email: string;
  phone: string;
  resume: string;
  employer: string;
  address: Address;
  demographics: Demographics;
  preferences: Preferences;
  socials: Socials;
  settings: Settings;
}
