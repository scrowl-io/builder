import { log } from '../utils/console';
import { getPath, readFile, getExt, getPathLocal } from '../utils/file-system';

export const create = (name: string) => {
  const data = {
    name,
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
    }
  ];
  const processedTemplates = [];

  for (let i = 0, ii = templateConfigs.length; i < ii; i++) {
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

    const extRes = getExt(config.filename);

    if (extRes.error) {
      log(extRes.message, 'error');
      continue;
    }

    const localFilename = config.filename.replace('/templates', '').replace(extRes.data.ext, '');
    const localRes = getPathLocal(localFilename);

    if (localRes.error) {
      log(localRes.message, 'error');
      continue;
    }

    processedTemplates.push({
      filename: localRes.data.url,
      contents: readRes.data.contents,
    });
    log(`${config.filename} initialization complete`, 'log');
  }

  console.log(processedTemplates);
};

export default {
  create,
};