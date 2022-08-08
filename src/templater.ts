import engine from 'handlebars';

export type TemplateData = {
  [key: string]: string | number;
};

engine.registerHelper('raw', opts => {
  return opts.fn();
});

export const compile = (contents: string, data: TemplateData) => {
  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data)
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err
    };
  }
};

export default {
  compile,
};
