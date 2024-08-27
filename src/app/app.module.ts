import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHammerConfig} from "./hammer.config";
import {ScreenModule} from "./screen/screen.module";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr"

registerLocaleData(localeFr, 'fr')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScreenModule,
    SharedModule,
    HammerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHammerConfig(),
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
