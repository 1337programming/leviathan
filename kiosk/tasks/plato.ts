import {Gulpclass, Task} from 'gulpclass/Decorators';

let gulp = require('gulp');
let plato = require('gulp-plato');

@Gulpclass()
export class Plato {
  
  @Task()
  plato() {
    return gulp.src(['app/src/**/*.ts'])
      .pipe(plato('report', {
        jshint: {
          options: {
            strict: true
          }
        },
        complexity: {
          trycatch: true
        },
        destDir: 'report/plato_reports/report_rebellion'
      }))
  }
  
}
