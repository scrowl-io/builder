import { execSync as exec } from 'child_process';
import { log } from '../utils/console';
import { getPath, readFile, getExt, getPathLocal, writeFile } from '../utils/file-system';
import { compile } from '../utils/templater';
import { toPascalCase, toCamelCase, toKebabCase } from '../utils/strings';

export const create = (templateName: string) => {
  const data = {
    name: templateName,
    pascal: toPascalCase(templateName),
    camel: toCamelCase(templateName),
    kebab: toKebabCase(templateName),
  };
  const templateConfigs = [
    {
      filename: 'templates/.parcelrc.hbs',
    },
    {
      filename: 'templates/.postcssrc.hbs',
    },
    {
      filename: 'templates/.sassrc.hbs',
    },
    {
      filename: 'templates/tsconfig.json.hbs',
    },
    {
      filename: 'templates/types/assets-modules.d.ts.hbs',
    },
    {
      filename: 'templates/.gitignore.hbs',
    },
    {
      filename: 'templates/.npmignore.hbs',
    },
    {
      filename: 'templates/package.json.hbs',
      compile: true,
    },
    {
      filename: 'templates/dev/index.html.hbs',
      compile: true,
    },
    {
      filename: 'templates/dev/index.tsx.hbs',
      compile: true,
    },
    {
      filename: 'templates/src/index.tsx.hbs',
      compile: true,
    },
    {
      filename: 'templates/src/styles.module.scss.hbs',
      compile: true,
    }
  ];

  log(`\ninitializing`, 'log');

  for (let i = 0, ii = templateConfigs.length; i < ii; i++) {
    let file = '';
    const config = templateConfigs[i];
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
  }

  log(`initialization complete`, 'success');
  log('\ninstalling dependencies', 'info');

  try {
    exec('npm install');
    log('install complete', 'success');
  } catch (e) {
    log('install failed', 'error');
  }
};

export default {
  create,
};