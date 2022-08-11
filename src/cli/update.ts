import { UpdateData } from './types';
import { log } from '../utils/console';
import { writeFile } from '../utils/file-system';
import { toLocal, fromLocal } from './templates';
import { compile } from '../utils/templater';

export const update = () => {
  log('\nupdating manifest', 'log');
  const manifestRes = fromLocal('./manifest.json');

  if (manifestRes.error) {
    log(manifestRes.message, 'error');
    return;
  }

  const appRes = toLocal('templates/dev/index.html.hbs');

  if (appRes.error) {
    log(appRes.message, 'error');
    return;
  }

  const data: UpdateData = {
    manifest: manifestRes.data.contents
  }

  const compileRes = compile(appRes.data.contents, data);

  if (compileRes.error) {
    log(compileRes.message, 'error');
    return;
  }
  
  const writeRes = writeFile(appRes.data.url, compileRes.data.contents);

  if (writeRes.error) {
    log(writeRes.message, 'error');
    return;
  }

  log('manifest update complete', 'success');
}

export default {
  update,
};
