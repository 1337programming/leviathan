import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {SETTINGS} from './core/settings';

declare let module: any;

if (SETTINGS.PROD) {
  enableProdMode();
} else {
  if (module.hot) {
    module.hot.accept();
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);


