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
    contents: string;
    data?: TemplateData;
  };
};

export type TemplateResult = TemplateResultSuccess | TemplateResultError;