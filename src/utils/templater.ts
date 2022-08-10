import engine from 'handlebars';
import { TemplateData, TemplateResult } from './templater.types';

engine.registerHelper('raw', opts => {
  return opts.fn();
});

engine.registerHelper('reactClassName', (str: string) => {
  if (typeof str !== 'string') {
    return str;
  }

  return `{styles.${str}}`;
})

export const compile = (contents: string, data?: TemplateData): TemplateResult => {

  if (!contents) {
    return {
      error: true,
      message: 'Unable to compile template: contents required'
    };
  }

  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data)
      },
    };
  } catch (e) {
    return {
      error: true,
      message: `Failed to compile template`,
      data: {
        contents,
        data,
        trace: e,
      },
    };
  }
};

export default {
  compile,
};
