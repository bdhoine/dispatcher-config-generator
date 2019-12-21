# Dispatcher Config Generator

**Warning**: This project is work in progress, so please contribute to work
towards a first release if you like the idea.

![Github Actions](https://github.com/bdhoine/dispatcher-config-generator/workflows/Build/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bdhoine_dispatcher-config-generator&metric=alert_status)](https://sonarcloud.io/dashboard?id=bdhoine_dispatcher-config-generator)

Generate dispatcher configuration files from templates with YAML input.

## Usage

When you install the tool the `dispatcher-config-generator` command should be
available

```sh
npm install -g dispatcher-config-generator
```

To Generate the config files you should issue the `dispatcher-config-generator`
command with the
config folder containing the config yaml files.
How these can be can be found in the configuration section.

```sh
dispatcher-config-generator -c config
```

Output will be generated in the [output](output) folder by default.

All options can be checked by passing the `--help` argument.

```sh
$ dispatcher-config-generator --help
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

The subfolders `dispatcher` and `farms` are fixed.
The config file for the dispatcher should also be `config.yaml`
For the farms you can choose an aribtrary name.

### Dispatcher

Example yaml config file for the dispatcher configuration

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

Example yaml config file for the dispatcher farm configuration

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

- Add more tests
- Enhance documentation
- Seperate config and logic to generate configs
- Determine mechanism to support environments or variables
- Add templates for vhost creation

## Development

To install all depenencies you can use the `npm` command.

```sh
npm install
```

Install the `dispatcher-config-generator` binary globally.

```sh
npm install -g .
```

To run all test you should use the `npm test` command.

All source code files are also checked on syntax.
To check this you should run the `npm lint` command.
