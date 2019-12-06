# Dispatcher Config Generator

![Github Actions](https://github.com/bdhoine/dispatcher-config-generator/workflows/build/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bdhoine_dispatcher-config-generator&metric=alert_status)](https://sonarcloud.io/dashboard?id=bdhoine_dispatcher-config-generator)

Generate dispatcher configuration files from templates with YAML input.

## Running

This project requires [nodejs](https://nodejs.org/) to run.
To install all runtime depenencies you can use the `npm` command.

```sh
npm install
```

Input will be read from the [config](config) folder.
Output will be generated in the [output](output) folder by default.

### NPM

To generate the dispatcher config files you can run the assemble `npm` script.

```sh
npm run generate
```

### Node

Generate the files with using the `node` cli.

```sh
node . -c config/
```

All options can be checked by passing the `--help` argument.

```sh
$ node . --help
Usage: -c <config-directory> [-o <output-directory>]

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  -c, --config  Path to config files                         [string] [required]
  -o, --output  Path to write output files to                           [string]
```

## Configuration

Configuration of the dispatcher and the corresponding farms should be done using
the following directory structure.

```txt
config/
├── dispatcher
│   └── config.yaml
└── farms
    └── default.yaml
    └── farm.yaml
```

### Dispatcher

```yaml
---
apache-log-level: dispatcher:warn
config-dir: conf
decline-root: Off
keep-alive-timeout: 60
log-level: warn
log-path: logs/dispatcher.log
name: dispatcher
pass-error: 0
ssi-no-cache: Off
use-processed-url: On
```

### Farms

```yaml
---
allowed-clients:
- type: allow
  glob: "*"
cache-rules:
- type: deny
  glob: "*"
client-headers:
- "*"
filters:
- type: allow
  glob: "*"
invalidate:
- type: allow
  glob: "*"
priority: 0
renderers:
- hostname: localhost
  port: 4503
virtual-hosts:
- "*"
```

## TODO

- Create unit and integration tests
- Enhance documentation
- Seperate config and logic to generate configs
- Determine mechanism to support environments
- Add templates for vhost creation
