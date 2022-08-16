import { log } from '../utils/console';
import { copyLocal, archiveLocal } from '../utils/file-system';
import { fromLocal } from './templates';

export const pack = () => {
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
  const archiveRes = archiveLocal('./build', `./dist/scrowl-slide-template-${manifest.meta.filename}.zip`);

  if (archiveRes.error) {
    log(archiveRes.message, 'error');
    return;
  }

  log('Archive created', 'success');
};

export default {
  pack,
};
