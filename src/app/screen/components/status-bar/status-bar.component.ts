import {Component} from '@angular/core';
import {ionCellular, ionFlash} from "@ng-icons/ionicons";
import {BatteryService, ClockService} from "../../../core/services";

@Component({
  selector: 'phone-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss'
})
export class StatusBarComponent {
  protected readonly iconSize = '17';
  protected readonly ionFlash = ionFlash;
  protected readonly ionCellular = ionCellular;

  constructor(protected clockService: ClockService, protected batteryService: BatteryService) {
  }
}
