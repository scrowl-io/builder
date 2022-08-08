import figlet from 'figlet';

export const hasLettersOnly = (str: string) => {
  return /^[a-zA-Z]+$/.test(str);
};

export const prettyJson = (obj: Object) => {
  return JSON.stringify(obj, null, 4);
};

export const toLower = (str: string) => {
  return str.trim().toLowerCase();
};

export const toCamelCase = (str: string) => {
  let replacedStr = str.replace(/[-_]+(.)?/g, (_, letter) => {
    return letter ? letter.toUpperCase() : '';
  });

  return replacedStr.substring(0, 1).toLowerCase() + replacedStr.substring(1);
};

export const toCapitalize = (str: string) => {
  return str.replace(/^[A-Z|a-z]/g, letter => letter.toUpperCase());
};

export const toPascalCase = (str: string) => {
  return toCapitalize(str).replace(/[-_]+(.)?/g, (_, letter) => {
    return letter ? letter.toUpperCase() : '';
  });
};

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toAsciiArt = (str: string) => {
  return figlet.textSync(str, {
    horizontalLayout: 'full',
  });
};

export default {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  prettyJson,
  toLower,
  toCapitalize,
  hasLettersOnly,
};
