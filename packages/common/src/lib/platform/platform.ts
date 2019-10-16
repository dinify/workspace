import React from 'react';
import { getName as getBrowserName } from './browser';

const platform = require('platform');

// from most specific to most generic
interface Options<T> {
  [key: string]: any,
  
  // fallback
  standard?: T,
};

interface EnvironmentOptions<T> extends Options<T> {
  // App environment
  standalone?: T,
}

interface OperatingSystemOptions<T> extends Options<T> {
  // OS family
  ios?: T,
  android?: T,
  windows?: T,
  osx?: T,
  blackberry?: T,
  chromeos?: T,
}

interface BrowserOptions<T> extends Options<T> {
  // Browser type
  safari?: T,
  chrome?: T,
}

interface FormFactorOptions<T> extends Options<T> {
  // form factor
  mobile?: T,
  tablet?: T,
  desktop?: T,
}

type PlatformOptions<T> = FormFactorOptions<T>|BrowserOptions<T>|OperatingSystemOptions<T>|EnvironmentOptions<T>;

export const select = (options: PlatformOptions<any>) => {
  const defined = (...args: any[]) => args.some(arg => (arg !== undefined && arg !== null));
  const normalize = (str: string|null) => str !== null ? str.toLowerCase().split(' ').join('') : 'standard';
  
  const osFamily = normalize(platform.os.family);
  const browserName = normalize(getBrowserName());
  const navigator: any = window.navigator;
  const isStandalone: boolean = navigator.standalone;
  // const product = normalize(platform.product);
  // const browserAgentName = normalize(platform.name);
  // const isDevtools = browserAgentName !== browserName;

  const viewportWidth = window.innerWidth;
  let formFactor = 'standard';
  if (viewportWidth <= 600) formFactor = 'mobile';
  else if (viewportWidth > 600 && viewportWidth < 1200) formFactor = 'tablet';
  else if (viewportWidth > 1200) formFactor = 'desktop';

  const { standard } = options;
  if (defined(options.standalone)) return isStandalone ? options.standalone : standard;
  else if (defined(options[osFamily])) return options[osFamily];
  else if (defined(options[browserName])) return options[browserName];
  else if (defined(options[formFactor])) return options[formFactor];
  return standard;
}

export const show = (options: PlatformOptions<React.Component|null>) => {
  options.standard = null;
  return select(options);
}

export const run = (options: PlatformOptions<() => void>) => {
  const result = select(options);
  if (result instanceof Function) {
    result();
  } 
}
