import { log } from '../utils/console';
import { getPath, readFile, getExt, getPathLocal, writeFile } from '../utils/file-system';
import { compile } from '../utils/templater';

export const create = (templateName: string) => {
  const data = {
    name: templateName,
  };
  const templateConfigs = [
    {
      dest: './',
      filename: 'templates/.parcelrc.hbs',
    },
    {
      dest: './',
      filename: 'templates/.postcssrc.hbs',
    },
    {
      dest: './',
      filename: 'templates/.sassrc.hbs',
      contents: ''
    },
    {
      dest: './',
      filename: 'templates/package.json.hbs',
      compile: true,
    }
  ];

  for (let i = 0, ii = templateConfigs.length; i < ii; i++) {
    let file = '';
    const config = templateConfigs[i];
    log(`initializing template: ${config.filename}`, 'log');
    const pathRes = getPath(config.filename);

    if (pathRes.error) {
      log(pathRes.message, 'error');
      continue;
    }

    const readRes = readFile(pathRes.data.url);

    if (readRes.error) {
      log(readRes.message, 'error');
      continue;
    }

    file = readRes.data.contents;
    const extRes = getExt(config.filename);

    if (extRes.error) {
      log(extRes.message, 'error');
      continue;
    }

    const localFilename = config.filename.replace('templates/', '').replace(extRes.data.ext, '');
    const localRes = getPathLocal(localFilename);

    if (localRes.error) {
      log(localRes.message, 'error');
      continue;
    }

    if (config.compile) {
      const compileRes = compile(file, data);

      if (compileRes.error) {
        log(compileRes.message, 'error');
        continue;
      }

      file = compileRes.data.contents;
    }

    const writeRes = writeFile(localRes.data.url, file);

    if (writeRes.error) {
      log(writeRes.message, 'error');
      continue;
    }

    log(`${config.filename} initialization complete`, 'log');
  }
};

export default {
  create,
};