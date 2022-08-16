import { program } from 'commander';
import { clear, print } from '../utils/console';
import { toAsciiArt } from '../utils/strings';
import { create } from './create';
import { update } from './update';
import { watch } from './watch';
import { pack } from './pack';

program
  .name('scrowl-builder')
  .description('A tool to initialize building slide templates for Scrowl')
  .version('0.0.1');

program
  .command('create')
  .description('Create boilerplate for a new Scrowl Slide Template')
  .argument('<string>', 'Template name')
  .action((name) => {
    create(name);
  });

program
  .command('update')
  .description('Update manifest in app')
  .action(() => {
    update();
  });

program
  .command('watch')
  .description('Watches for changes in manifest then updates')
  .action(() => {
    watch();
  });

program
  .command('pack')
  .description('Packages the template so that it can be imported into Scrowl')
  .action (() => {
    pack();
  });

export const start = () => {
  const toolName = toAsciiArt('Scrowl Builder CLI');

  clear();
  print(toolName, 'cyanBright');
  program.parse(process.argv);
};

export default {
  start,
};
