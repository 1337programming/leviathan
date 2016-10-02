import {Injectable, Inject, NgZone} from '@angular/core';
const loader = require('webaudio-buffer-loader');

const NOTE_SAMPLES = {
  explosion1: require('file!app/samples/explosion-1.mp3'),
  explosion2: require('file!app/samples/explosion-2.mp3'),
  rocket1: require('file!app/samples/rocket-1.mp3'),
  rocket2: require('file!app/samples/rocket-2.mp3'),
  rocket3: require('file!app/samples/rocket-3.mp3'),
};

@Injectable()
export class Samples {
  totalSampleCount = 0;
  loadedSampleCount = 0;
  private sampleCache = new Map();
  
  constructor(@Inject('audioContext') private audioCtx, private ngZone:NgZone) {
    for (const note of Object.keys(NOTE_SAMPLES)) {
      this.getSample(note);
    }
  }
  
  getSample(key:string):any {
    if (!this.sampleCache.has(key)) {
      this.totalSampleCount++;
      this.sampleCache.set(key, new Promise((resolve, reject) => {
        loader(NOTE_SAMPLES[key], this.audioCtx, (err, loadedBuffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(loadedBuffer);
            this.ngZone.run(() => this.loadedSampleCount++);
          }
        });
      }));
    }
    return this.sampleCache.get(key);
  }
  
}
