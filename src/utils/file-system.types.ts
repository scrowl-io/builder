import { JsonResult } from './objects.types';

export interface FSResultSuccess {
  error: false;
  data: JsonResult;
};

export interface FSResultError {
  error: true;
  message: string;
  data?: {
    trace: any;
  };
};

export type FSResult = FSResultSuccess | FSResultError;