import chokidar from 'chokidar';
import { log } from '../utils/console';
import { getPathLocal } from '../utils/file-system';
import { update } from './update';

export const watch = () => {
  const pathRes = getPathLocal('./manifest.json');

  if (pathRes.error) {
    log(pathRes.message, 'error');
    return;
  }

  chokidar.watch(pathRes.data.url).on('change', () => {
    update();
  });
};

export default {
  watch,
};
