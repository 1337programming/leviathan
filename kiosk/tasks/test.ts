import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let Server = require('karma').Server;

@Gulpclass()
export class Test {
  
  /**
   * Run Unit Jasmine tests using Karama as the test runner
   * @param cb
   */
  @Task('test:unit')
  unit(cb: Function) {
    new Server({
      configFile: path.resolve(__projectRoot, 'test/karma.unit.config.js'),
      singleRun: true
    }).start();
  }
  
  @SequenceTask()
  test() {
    return ['test:unit'];
  }
  
}
