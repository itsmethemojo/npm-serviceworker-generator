'use strict';

var fs = require('fs-extra')
var serviceworkerTemplate = require('../index.js');

var configFile = __dirname + '/../dist/serviceworker-config.json';

// write a config file to use
fs.outputFileSync(configFile, '[{"type": "putInCacheOnceAndDeliverOnlyFromCacheThen","key": "forever1","indexOf": [".png",".css"]}]');

serviceworkerTemplate.create(
  __dirname + '/../dist/serviceworker.js',
  configFile
);
