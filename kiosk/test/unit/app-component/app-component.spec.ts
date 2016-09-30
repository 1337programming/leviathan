import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import {AppComponent} from 'app/src/app.component';


describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  
  beforeEach(() => TestBed.configureTestingModule({providers: [AppComponent]}));
  
  
});
