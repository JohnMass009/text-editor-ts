import {ObjectAny} from "@core/types";

export function getStrWithFirstUpperLetter (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toInlineStyles(styles: ObjectAny) {
  return Object.keys(styles).map((style) => {
    return `${camelToDashCase(style)}:${styles[style]}`;
  }).join(';');
}

export function camelToDashCase(string: string) {
  return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function isEqual(param1: any, param2: any): boolean {
  if (param1 === param2) return true;

  if (typeof param1 === 'object' && typeof param2 === 'object') {
    return Object.keys(param1).every((key) => {
      if (!param2[key])
        return false;
      if (typeof param1[key] === 'object' && typeof param2[key] === 'object')
        return isEqual(param1[key], param2[key]);

      return param1[key] === param2[key];
    })
  }

  return true;
}

export function toSessionStorage(key: string, data?: any): string | void {
  if (!data) {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null;
  }
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function debounce(fn: Function, interval: number): Function {
  let timeout: any;
  return function (...args: any) {
    const callback = () => {
      fn(...args);
    };
    clearTimeout(timeout);

    timeout = setTimeout(callback, interval);
  }
}