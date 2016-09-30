import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Build {
  
  /**
   * Build Task
   * @returns {any}
   */
  @Task('bundle-build')
  webpackBuild() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --prod --progress --profile --colors --display-error-details --display-cached --optimize-occurrence-order --optimize-dedupe']));
  }

  @Task('add-server') 
  addServer() {
    return gulp.src(path.resolve(__projectRoot, 'server.js'))
      .pipe(gulp.dest(path.resolve(__projectRoot, 'dist')))
  }

  @Task('copy-package')
   copyPackage() {
     return gulp.src(path.resolve(__projectRoot, 'package.json'))
     .pipe(gulp.dest(path.resolve(__projectRoot, 'dist')))
  }

  @SequenceTask('pre-build')
  preBuild() {
    return ['lint']
  }
  
  @SequenceTask()
  build() {
    return ['pre-build', 'bundle-build', 'add-server', 'copy-package']
  }
  
  
}
