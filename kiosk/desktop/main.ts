const electron = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray = null;
let appIcon = null;

require(path.join('./src/window'));
require(path.join('./src/scanner'));
