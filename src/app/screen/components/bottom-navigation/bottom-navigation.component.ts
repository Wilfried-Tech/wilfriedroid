import {Component} from '@angular/core';
import {ionEllipseOutline, ionSquareOutline, ionTriangleOutline} from "@ng-icons/ionicons";

@Component({
  selector: 'phone-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss'
})
export class BottomNavigationComponent {

  protected readonly ionSquareOutline = ionSquareOutline;
  protected readonly ionEllipseOutline = ionEllipseOutline;
  protected readonly ionTriangleOutline = ionTriangleOutline;
}
