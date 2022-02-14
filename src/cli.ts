#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

import { Command } from 'commander';

// Using .js for dist ESM to work because TS does not add it at compilation
import { Lus } from './lib.js';
import type { LusOptions } from './lib.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

program
  .name('lus')
  .description(
    'Format Vue SFC files that uses stylus, based on stylus-supremacy'
  )
  .version(version);

program
  .argument('<glob>', 'File or glob to format on')
  .option('-v, --verbose', 'verbose output', false)
  .option('-g, --glob <glob>', 'the glob pattern to match files', '**/*.vue')
  .option('-c, --config <config>', 'the config file to use', '.stylusrc')
  .option(
    '-i, --ignore <globs>',
    'ignore files using these comma-separated glob patterns',
    (value: string) => value.split(','),
    []
  ).action((glob: string, options: Omit<LusOptions, 'glob'>) => {
    console.log(glob, options);
    const lusOptions: LusOptions = {
      ...options,
      glob,
    }
    const lus = new Lus(lusOptions);
    lus.run();
  })

program.parse();
