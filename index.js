'use strict';

var outputData = "";

var fs = require('fs-extra')

function createFile(cacheDefinitions, targetFile){
  validateCacheDefinitions();

  addFileToOutputData('src/lib/functions/deleteUnusedCaches.js');
  addFileToOutputData('src/lib/functions/putInCacheOnceAndDeliverOnlyFromCacheThen.js');

  addToOutputData('self.addEventListener(\'activate\', function (event) { deleteUnusedCaches(event, ' + buildCacheIdsList(cacheDefinitions) + ')});');

  //start fetch listener
  addToOutputData('self.addEventListener(\'fetch\', function (event) {');

  //write fetch methods for all cacheDefinitions
  for(var n in cacheDefinitions){
    addToOutputData(buildFetchFunctionForCacheDefinition(cacheDefinitions[n]));
  }
  //finish fetch listener
  addToOutputData('});');

  writeOutputFile(targetFile);
}

function addToOutputData(data){
  outputData += '\n' + data;
}

function addFileToOutputData(filePath){
  addToOutputData(fs.readFileSync(__dirname + '/' + filePath, 'utf8'));
}

function writeOutputFile(outputFilePath){
  fs.outputFileSync(outputFilePath, outputData);
}

function buildCacheIdsList(cacheDefinitions){
  //TODO implement
  return '[\'' + cacheDefinitions[0]['key'] + '\']';
}

function buildFetchFunctionForCacheDefinition(cacheDefinition){
  //build condition
  var firstLiteral = true;
  var output = "";
  output += '  if(\n';
  for(var n in cacheDefinition['indexOf']){
    output += '    ';
    if(firstLiteral){
      firstLiteral = false;
    }
    else{
      output+= '|| '
    }
    output += '-1 !== event.request.url.indexOf(\'' + cacheDefinition['indexOf'][n] + '\')\n';
  }
  output += '  ){\n';
  output += '    putInCacheOnceAndDeliverOnlyFromCacheThen(event, \'' + cacheDefinition['key'] + '\');\n';
  output += '  }\n';
  return output;
}

function validateCacheDefinitions(cacheDefinitions){
  //TODO implement
}

module.exports.create = createFile;
