import {Component} from '@angular/core';
import {ControlCenterService} from "./services";

@Component({
  selector: 'phone-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss'
})
export class ScreenComponent {

  constructor(private controlCenterService: ControlCenterService) {
  }

  protected openTopPanel() {
    this.controlCenterService.isOpen = true
  }
}
