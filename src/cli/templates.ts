import { FSResult } from '../utils/file-system.types';
import { getPath, readFile, getExt, getPathLocal, writeFile } from '../utils/file-system';

export const toLocal = (filename: string): FSResult => {
  const pathRes = getPath(filename);

  if (pathRes.error) {
    return pathRes;
  }

  const readRes = readFile(pathRes.data.url);

  if (readRes.error) {
    return readRes;
  }

  const extRes = getExt(filename);

  if (extRes.error) {
    return extRes;
  }

  const localFilename = filename.replace('templates/', '').replace(extRes.data.ext, '');
  const localRes = getPathLocal(localFilename);

  if (localRes.error) {
    return localRes;
  }

  return {
    error: false,
    data: {
      contents: readRes.data.contents,
      url: localRes.data.url,
    },
  };
}

export const fromLocal = (filename: string): FSResult => {
  const pathRes = getPathLocal(filename);
  
  if (pathRes.error) {
    return pathRes;
  }

  return readFile(pathRes.data.url);
}

export const writeLocal = (filename: string, contents: string): FSResult => {
  const pathRes = getPathLocal(filename);

  if (pathRes.error) {
    return pathRes;
  }

  return writeFile(pathRes.data.url, contents);
};

export default {
  toLocal,
  fromLocal,
};
