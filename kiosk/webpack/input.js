const path = require('path');

module.exports = {
  app: path.join('./app/src/main.ts'),
  head: path.join('./app/src/head.ts'),
  polyfill: path.join('./app/src/polyfill.ts'),
  vendor: path.join('./app/src/vendor.ts')
};
