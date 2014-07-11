'use strict';

var _ = require('lodash');
var nex = require('nex-api');
var rimraf = require('rimraf');
var fs = require('fs');
var log = require('npmlog');
var colors = require('colors');

var handler = module.exports = new nex.Handler('symlinks');

/**
 * @override
 */
handler.do = function (pkg) {
  _.each(pkg[this.field], function (linkName, target) {
    log.info('symlink', linkName, '->'.green, target);
    rimraf.sync(linkName);
    fs.symlinkSync(target, linkName);
  });
};

/**
 * @override
 */
handler.undo = function (pkg) {
  _.each(pkg[this.field], rimraf.sync);
};
