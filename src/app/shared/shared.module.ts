import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {NgIcon} from "@ng-icons/core";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    NgIcon,
    MatButtonToggle,
    MatButton,
    MatMiniFabButton,
    MatSlideToggle,
    MatSlider,
    MatIconButton,
    MatSliderThumb
  ]
})
export class SharedModule { }
