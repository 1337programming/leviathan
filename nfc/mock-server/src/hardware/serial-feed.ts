import SerialPort = require('serialport');
import {StreamEmitter} from '../stream-emitter/stream-emitter';

export class SerialFeed {

  private port:SerialPort; // USB port handler
  private streamEmitter:StreamEmitter; // Shared Emitter
  private uid:string;
  
  constructor(streamEmitter:StreamEmitter) {
    this.port = new SerialPort('/dev/cu.usbmodem1411', {
      baudrate: 115200,
      parser: SerialPort.parsers.readline('\r\n')
    });
    this.streamEmitter = streamEmitter;
    this.uid = '';
  }
  
  public run() {
    this.scan();
  }
  
  public getUid():string {
    return this.uid;
  }
  
  public setUid(uid:string) {
    this.uid = uid;
  }
  
  private scan() {
    // @TODO check data
    this.port.on('open', () => {
      console.log(`${new Date()}: Serial Port Open`);
      this.port.on('data', (data) => {
        let str:string = data.toString('utf8');
        let array:Array<string> = str.split(' ');
        if (array.length > 3) {
          array[3] = array[3].replace('\r\n', '');
        }
        let uid:string = array.join(' ');
        this.setUid(uid);
        // @TODO add validation
        this.streamEmitter.emit('UID', this.getUid());
      });
    });
  }
  
  private checkValidHex(input) {
    let array:Array<string> = input.split(' ');
  }
}
