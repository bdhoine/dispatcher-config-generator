#!/usr/bin/env node

const discog = require('../src/discog');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -c <config-directory> [-o <output-directory>]')
    .option('c',
        {
          alias: 'config',
          describe: 'Path to config files',
          type: 'string',
          demandOption: true
        })
    .option('o',
        {
          alias: 'output',
          describe: 'Path to write output files to',
          type: 'string'
        })
    .argv;

discog({
  config: options.config,
  output: options.output || 'output'
});
