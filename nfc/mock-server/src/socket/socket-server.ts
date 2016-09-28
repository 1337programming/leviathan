import {StreamEmitter} from '../stream-emitter/stream-emitter';

export class SocketServer {
  
  private io: any; // Shared io connection
  private streamEmitter:StreamEmitter; // Shared Event Emitter
  
  constructor(io, streamEmitter) {
    this.io = io;
    this.streamEmitter = streamEmitter;
  }
  
  public runServer() {
    this.io.on('connection', (socket) => {
      console.log(`${new Date()}: A user has connected`);
    
      let formChangeSubscription = this.streamEmitter.listen('FormChange', () => {
        console.log('Buzzword field added');
        socket.emit('FormChange', null);
      });
    
      socket.on('disconnect', () => {
        console.log('user disconnected');
        formChangeSubscription.dispose();
      });
    
    });
  }
}
