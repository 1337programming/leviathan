import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Serve {
  
  /**
   * Serves up application in dev mode
   * @returns {any}
   */
  @Task('bundle-serve')
  bundleServe() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack-dev-server --browser --hot --inline --progress --profile --colors --display-error-details --display-cached']));
  }
  
  /**
   * Serves up application in production mode
   * @returns {any}
   */
  @Task('bundle-serve-dist')
  bundleServeDist() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --browser --prod --progress --profile --colors --display-error-details --display-cached --optimize-occurrence-order --optimize-dedupe']));
  }
  
  @SequenceTask('pre-serve')
  preServe() {
    return ['lint']
  }
  
  @SequenceTask()
  serve() {
    return ['lint', 'bundle-serve']
  }
  
  @SequenceTask('serve-dist')
  serveDist() {
    return ['pre-build', 'bundle-serve-dist']
  }
  
  @Task("someTask")
  sometask() {
    return ['serve-dist']
  }
}
