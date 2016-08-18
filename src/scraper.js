import phantom from 'phantom';
import Promise from 'bluebird';
import _ from 'underscore';

import {
  IGNORE_SSL_ERRORS,
  LOAD_IMAGES,
  WEB_SECURITY,
  PROXY,
  PROXY_TYPE,
  PROXY_AUTH
} from './environment';

import {
  UrlRequiredError,
  ScriptRequiredError
} from './errors';

let opts = [
  `--ignore-ssl-errors=${IGNORE_SSL_ERRORS}`,
  `--load-image=${LOAD_IMAGES}`,
  `--web-security=${WEB_SECURITY}`
];

if (PROXY) {
  opts.push(`--proxy=${PROXY}`);
  if (PROXY_TYPE) opts.push(`--proxy-type=${PROXY_TYPE}`);
  if (PROXY_AUTH) opts.push(`--proxy-auth=${PROXY_AUTH}`);
}

let instance = phantom.create(opts);

export default async function scraper (opts = {}) {
  const {
    userAgent = 'settings.userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36',
    url,
    script
  } = opts;

  if (!_.isString(url)) throw new UrlRequiredError();
  if (!_.isString(script)) throw new ScriptRequiredError();

  const ph = await instance;

  const page = await ph.createPage();

  await page.setting('userAgent', userAgent);

  await page.open(url);

  await page.includeJs()
}
