import path from 'path';
import fs from 'fs-extra';

import { FSResult } from './file-system.types';

const createResultError = (message: string, error?: any): FSResult => {
  if (error === undefined) {
    return {
      error: true,
      message,
    };
  } else {
    return {
      error: true,
      message,
      data: {
        trace: error,
      },
    };
  }
}

export const getExt = (pathname: string): FSResult => {

  if (!pathname) {
    return createResultError('Unable to get ext: pathname required');
  }

  try {
    const ext = path.extname(pathname);

    return {
      error: false,
      data: {
        ext,
        pathname,
      },
    };
  } catch (e) {
    return createResultError(`Unable to get ext from ${pathname}`, e);
  }
}

export const getPath = (pathname: string): FSResult => {
  if (!pathname) {
    return createResultError('pathname is required');
  }
  
  try {
    const url = path.normalize(path.resolve(__dirname, '../', pathname));

    return {
      error: false,
      data: {
        url,
        pathname,
      },
    };
  } catch (e) {
    return createResultError(`Unable to get path from ${pathname}`, e);
  }
}

export const getPathLocal = (pathname: string): FSResult => {
  if (!pathname) {
    return createResultError('pathname is required');
  }

  try {
    const url = path.normalize(path.join(process.cwd(), pathname));

    return {
      error: false,
      data: {
        url,
        pathname,
      },
    };
  } catch (e) {
    return createResultError(`Unable to get local path for: ${pathname}`, e);
  }
};

export const readFile = (pathname: string): FSResult => {

  if (!pathname) {
    return {
      error: true,
      message: 'pathname is required'
    }
  }
  
  try {
    const pathRes = getPath(pathname);

    if (pathRes.error) {
      return pathRes;
    }

    let contents = fs.readFileSync(pathRes.data.url, 'utf-8');
    const extRes = getExt(pathname);

    if (extRes.error) {
      return extRes;
    }

    if (extRes.data.ext === 'json' || extRes.data.ext.lastIndexOf('rc') === extRes.data.ext.length - 2) {
      contents = JSON.parse(contents);
    }

    return {
      error: false,
      data: {
        contents,
        pathname,
      }
    };
  } catch (e) {
    return createResultError(`Unable to read ${pathname}`, e);
  }
}

export default {
  getExt,
  getPath,
  getPathLocal,
  readFile,
};
