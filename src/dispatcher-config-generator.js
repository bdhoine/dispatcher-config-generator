#!/usr/bin/env node

const async = require('async');
const glob = require('glob');

const FarmConfig = require('./farm/farm-config');
const DispatcherConfig = require('./dispatcher/dispatcher-config');

function generateDispatcherConfig(options) {
  const configPath = `${options.config}/dispatcher/config.yaml`;
  const config = new DispatcherConfig({path: configPath});
  config.generate();
}

function generateFarmConfig(options) {
  glob(`${options.config}/farms/*.yaml`, function(_, files) {
    async.each(files, function(configPath, next) {
      const config = new FarmConfig({path: configPath});
      config.generate();
      next();
    });
  });
}

function generate(options) {
  generateDispatcherConfig(options);
  generateFarmConfig(options);
}

module.exports = generate;
