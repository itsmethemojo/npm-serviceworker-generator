'use strict';

var serviceworkerTemplate = require('../index.js');

serviceworkerTemplate.create(
  [{
    'type': 'putInCacheOnceAndDeliverOnlyFromCacheThen',
    'key': 'forever1',
    'indexOf': ['.png','.css']
  }],
  __dirname + '/../dist/serviceworker.js'

);
