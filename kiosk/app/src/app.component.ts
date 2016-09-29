import {Component, Inject} from '@angular/core';

@Component({
  selector: 'kiosk',
  template: `
        <div (window:resize)="onWindowResize()">
            <header-bar></header-bar>
            <router-outlet></router-outlet>
            <footer-bar></footer-bar>
            <!--<loading-indicator *ngIf="isLoading()" [progress]="getLoadProgress()"></loading-indicator>-->
        </div>
            `
})
export class AppComponent {
  
  public bufferLoaded = false;
  public size: any;
  
  constructor() {
    this.size = {};
    this.onWindowResize();
    setTimeout(() => this.bufferLoaded = true, 4200);
    
  }
  
  onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
  
  getLoadProgress() {
    const bfrCount = this.bufferLoaded ? 1 : 0;
    return 101;
  }
  
  isLoading() {
    return this.getLoadProgress() < 100;
  }
}
