import { log } from '../utils/console';
import { copyLocal, archiveLocal } from '../utils/file-system';
import { fromLocal, writeLocal } from './templates';

const removeStylesheet = () => {
  try {
    const pkgRes = fromLocal('./package.json');

    if (pkgRes.error) {
      console.error('Unable to read package.json', pkgRes);
      return pkgRes;
    }

    const pkg = JSON.parse(pkgRes.data.contents);
    const tplRes = fromLocal(pkg.prod);

    if (tplRes.error) {
      console.error('Unable to read template build', tplRes);
      return tplRes;
    }

    const template = tplRes.data.contents.replace(/^import "\.\/(.*)\.css";/g, '');

    return writeLocal(pkg.prod, template);
  } catch (e) {
    console.error('Failed to reformat build file', e);
  }
};

export const pack = async () => {
  log('\nCreating package archive', 'log');
  const manifestRes = fromLocal('./manifest.json');

  if (manifestRes.error) {
    log(manifestRes.message, 'error');
    return;
  }

  const copyRes = copyLocal('./manifest.json', './build/manifest.json');

  if (copyRes.error) {
    log(copyRes.message, 'error');
    return;
  }

  const manifest = JSON.parse(manifestRes.data.contents);
  removeStylesheet();
  const archiveRes = archiveLocal('./build', `./dist/template-${manifest.meta.filename}.zip`);

  if (archiveRes.error) {
    log(archiveRes.message, 'error');
    return;
  }

  log('Archive created', 'success');
};

export default {
  pack,
};
