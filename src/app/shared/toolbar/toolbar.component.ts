import {Component} from '@angular/core';
import {ionBookOutline, ionVolumeHighOutline, ionVolumeLowOutline, ionPowerOutline} from "@ng-icons/ionicons"

@Component({
  selector: 'phone-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  protected readonly ionBookOutline = ionBookOutline;
  protected readonly ionVolumeHighOutline = ionVolumeHighOutline;
  protected readonly ionVolumeLowOutline = ionVolumeLowOutline;
  protected readonly ionPowerOutline = ionPowerOutline;
}
