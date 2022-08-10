import path from 'path';
import fs from 'fs-extra';

import { FSResult } from './file-system.types';
import { JsonResult } from './objects.types';

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

const isJSON = (pathname: string): FSResult => {
  const extRes = getExt(pathname);

  if (extRes.error) {
    return extRes;
  }

  if (extRes.data.ext === 'json' || extRes.data.ext.lastIndexOf('rc') === extRes.data.ext.length - 2) {
    return {
      error: false,
      data: {
        isJSON: true
      }
    }
  }

  return {
    error: false,
    data: {
      isJSON: false
    }
  }
};

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
    const jsonRes = isJSON(pathname);

    if (jsonRes.error) {
      return jsonRes;
    }

    if (jsonRes.data.isJSON) {
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

export const writeFile = (filename: string, contents: string | JsonResult): FSResult => {
  if (!filename) {
    return createResultError('Unable to write file: filename required');
  }

  if (!contents) {
    return createResultError('Unable to write file: contents required');
  }

  try {
    let file = contents;
    const jsonRes = isJSON(filename);

    if (jsonRes.error) {
      return jsonRes;
    }

    if (jsonRes.data.isJSON) {
      if (typeof contents !== 'string') {
        file = JSON.stringify(contents, null, 2);
      } else {
        file = JSON.stringify(JSON.parse(contents), null, 2);
      }
    }

    fs.outputFileSync(filename, file);

    return {
      error: false,
      data: {
        filename,
        file,
        contents,
      },
    };
  } catch (e) {
    return createResultError(`Unable to write file: ${filename}`, e);
  }
}

export default {
  getExt,
  getPath,
  getPathLocal,
  readFile,
};
