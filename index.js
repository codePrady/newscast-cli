#!/usr/bin/env node
'use strict';
const path = require('path');
const program = require('commander');

const list = require('./lib/list');

const pkg = require(path.join(__dirname, 'package.json'));

program.version(pkg.version).description(pkg.description);

program
  .command('eds')
  .arguments('<source>')
  .description(
    'List Editorials from TheHindu, ET, Guardian, HinduBusinessLine, IndianExpress'
  )
  .action(function(source, options) {
    list('eds', {
      value: source
    });
  });

program
  .command('magz')
  .arguments('<source>')
  .description(
    'List Editorials from HarvardBusinessReview, ProjectSyndicate, Economist, NewYorker, TheAtlantic'
  )
  .action(function(source, options) {
    list('magz', {
      value: source
    });
  });

program
  .command('sports')
  .arguments('<sport>')
  .description('List trending Sports Stories from F1, EPL world')
  .action(function(sport, options) {
    list('sports', {
      value: sport
    });
  });

program
  .command('science')
  .arguments('<source>')
  .description('List articles from PopSci and SciAmerican')
  .action(function(source, options) {
    list('science', {
      value: source
    });
  });

program
  .command('tech')
  .arguments('<source>')
  .description('List articles from PopSci and SciAmerican')
  .action(function(source, options) {
    list('tech', {
      value: source
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Show help by default
  program.outputHelp();
}
