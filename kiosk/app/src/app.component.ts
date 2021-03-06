import {Component} from '@angular/core';
import {FirebaseService} from './common/services/firebase.service';

@Component({
  selector: 'kiosk',
  template: `
        <div (window:resize)="onWindowResize()">
            <router-outlet></router-outlet>
        </div>
            `
})
export class AppComponent {
  
  public bufferLoaded = false;
  public size: any;
  
  constructor(private firebaseService: FirebaseService) {
    this.size = {};
    this.onWindowResize();
    setTimeout(() => this.bufferLoaded = true, 4200);
    
  }
  
  private onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
  
  private getLoadProgress() {
    const bfrCount = this.bufferLoaded ? 1 : 0;
    return 101;
  }
  
  private isLoading() {
    return this.getLoadProgress() < 100;
  }
}
