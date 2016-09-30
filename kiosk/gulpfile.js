/**
 * This file is the main script for our gulp tasks.
 * This files main job is to drive the TypeScript gulp files.
 * Get all the typescript files from the tasks folder, compile them then run them as any other gulp file
 */
const path = require('path');
const glob = require('glob');

global.__projectRoot = path.resolve(__dirname);
const files = glob.sync(path.resolve(__dirname, 'tasks/*.ts'));

files.forEach(function (file) {
  eval(require('typescript').transpile(require('fs').readFileSync(file).toString()))
});
