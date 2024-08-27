import { ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import "hammerjs"
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
  .catch(err => console.error(err));
