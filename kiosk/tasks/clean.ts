import {Gulpclass, Task} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let del = require('del');

@Gulpclass()
export class Clean {
  
  /**
   * Clean Task, deletes build and report folders
   * @param cb
   * @returns {any}
   */
  @Task()
  clean(cb: Function) {
    let dist: string = path.resolve(__projectRoot, 'dist/**');
    let doc: string = path.resolve(__projectRoot, 'doc/**');
    return del([dist, doc], cb);
  }
  
}