import { CreateData } from './types';
import { execSync as exec } from 'child_process';
import { log } from '../utils/console';
import { writeFile } from '../utils/file-system';
import { toLocal } from './templates';
import { compile } from '../utils/templater';
import { toPascalCase, toCamelCase, toKebabCase } from '../utils/strings';

export const create = (templateName: string) => {
  const data: CreateData = {
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
      filename: 'templates/types/globals.d.ts.hbs',
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
      filename: 'templates/manifest.json.hbs',
      saveContents: true,
      saveAs: 'manifest',
      compile: true,
    },
    {
      filename: 'templates/README.md.hbs',
      compile: true,
    },
    {
      filename: 'templates/package.json.hbs',
      compile: true,
    },
    {
      filename: 'templates/dev/src/index.html.hbs',
      compile: true,
    },
    {
      filename: 'templates/dev/src/index.tsx.hbs',
      compile: true,
    },
    {
      filename: 'templates/dev/src/app.module.scss.hbs',
      compile: true,
    },
    {
      filename: 'templates/src/index.tsx.hbs',
      compile: true,
    },
    {
      filename: 'templates/src/styles.module.scss.hbs',
      compile: true,
    },
    {
      filename: 'templates/src/components/component-example.tsx.hbs'
    },
    {
      filename: 'templates/src/components/index.ts.hbs'
    },
    {
      filename: 'templates/src/slide.tsx.hbs' // TODO put Slide as a lib in Scrowl to be made as a dependency
    },
    {
      filename: 'templates/src/slide.module.scss.hbs' // TODO put Slide as a lib in Scrowl to be made as a dependency
    }
  ];

  log(`\ninitializing`, 'log');

  for (let i = 0, ii = templateConfigs.length; i < ii; i++) {
    let file = '';
    const config = templateConfigs[i];
    const localRes = toLocal(config.filename);

    if (localRes.error) {
      log(localRes.message, 'error');
      continue;
    }

    file = localRes.data.contents;

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

    if (config.saveContents && config.saveAs) {
      data[config.saveAs] = file;
    }
  }

  log(`initialization complete`, 'success');
  log('\ninstalling dependencies', 'log');

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