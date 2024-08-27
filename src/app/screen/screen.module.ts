import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScreenComponent} from './screen.component';
import {StatusBarComponent} from './components/status-bar/status-bar.component';
import {BottomNavigationComponent} from './components/bottom-navigation/bottom-navigation.component';
import {MatIconButton} from "@angular/material/button";
import {NgIcon} from "@ng-icons/core";
import {LauncherComponent} from './components/launcher/launcher.component';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {ControlCenterComponent} from "./components/control-center/control-center.component";
import {MatRipple} from "@angular/material/core";
import {ControlCenterService} from "./services";


@NgModule({
  declarations: [
    ScreenComponent,
    StatusBarComponent,
    BottomNavigationComponent,
    LauncherComponent,
    ControlCenterComponent
  ],
  exports: [
    ScreenComponent
  ],
    imports: [
        CommonModule,
        MatIconButton,
        NgIcon,
        MatSlider,
        MatSliderThumb,
        NgOptimizedImage,
        MatRipple,
    ],
  providers: [
    ControlCenterService
  ]
})
export class ScreenModule {
}
