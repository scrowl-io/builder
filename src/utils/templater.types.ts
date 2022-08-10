export type TemplateData = {
  [key: string]: string | number;
};

export interface TemplateResultSuccess {
  error: false;
  data: {
    contents: string;
  };
};

export interface TemplateResultError {
  error: true;
  message: string;
  data?: {
    trace: any;
  };
};

export type TemplateResult = TemplateResultSuccess | TemplateResultError;