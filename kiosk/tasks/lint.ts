import {Gulpclass, Task} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Lint {
  
  /**
   * Runs linter
   * @returns {any}
   */
  @Task()
  lint() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['tslint \"src/**/*.ts\"']));
  }
  
}
