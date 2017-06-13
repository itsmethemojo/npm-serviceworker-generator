#!/usr/bin/env node

var myArgs = require('optimist').argv;

if ((myArgs.h)||(myArgs.help)) {
  //TODO write cli help
  console.log("not helping yet");
  process.exit(0);
}

var targetFile = myArgs.f || myArgs.targetFile;
var configFile = myArgs.c || myArgs.configFile;

if(!targetFile || !configFile){
  //TODO error handling
}

var serviceworker = require('..');

serviceworker.create(
  targetFile,
  configFile
);
