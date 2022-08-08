import { program } from 'commander';
import { create } from './create';
import { clear, print } from '../utils/console';
import { toAsciiArt } from '../utils/strings';

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

export const start = () => {
  const toolName = toAsciiArt('Scrowl Builder CLI');

  clear();
  print(toolName, 'cyanBright');
  program.parse(process.argv);
};

export default {
  start,
};
