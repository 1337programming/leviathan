import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as Firebase from 'firebase';
import { User } from '../interfaces/firebase.interface';

@Injectable()
export class FirebaseService {

  private instance: any;
  private authData: any;
  private queue: Array<User>;

  constructor() {
    this.queue = [];
    let config: any = {
      apiKey: 'AIzaSyDCsVpnth6y3SN3P_zOvB5PaK_UR9_xL0Q',
      authDomain: 'arduinonfc-e0df7.firebaseapp.com',
      databaseURL: 'https://arduinonfc-e0df7.firebaseio.com',
      storageBucket: 'arduinonfc-e0df7.appspot.com'
    };
    if (Firebase.apps.length > 0) {
      this.instance = Firebase.apps[0];
    } else {
      this.instance = Firebase.initializeApp(config);
    }
    this.handleEvents();
  }

  public getQueue(): Array<User> {
    return this.queue;
  }

  private handleEvents() {
    let queueRef = this.instance.database().ref('queue');
    queueRef.on('value', (data) => {
      this.queue = [];
      // console.log(data);
      let obj = data.val();
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // Linting error fix
          this.queue.push(obj[key]);
        }
      }
    });
  }

  private getAuthData(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.instance.authAnonymously((error: any, authData: any) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(authData);
        }
      });
    });
  }

}
