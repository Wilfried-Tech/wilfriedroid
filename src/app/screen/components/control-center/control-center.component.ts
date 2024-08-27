import {
  Component,
  ElementRef, HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild
} from '@angular/core';
import {matBrightness7Sharp} from "@ng-icons/material-icons/sharp";
import {ControlCenterOption, ControlCenterService} from "../../services";
import {Observable, skip} from 'rxjs';
import {matSettingsOutline} from "@ng-icons/material-icons/outline";
import {ClockService} from "../../../core/services";


@Component({
  selector: 'phone-control-center',
  templateUrl: './control-center.component.html',
  styleUrl: './control-center.component.scss'
})
export class ControlCenterComponent implements OnInit {
  protected readonly matSettingsOutline = matSettingsOutline;
  protected readonly matBrightness7Sharp = matBrightness7Sharp;
  protected items$!: Observable<ControlCenterOption[]>
  readonly timeFormat = 'hh:mm'
  private currentPosition = 0

  @ViewChild('controlCenter') controlCenter!: ElementRef;
  private panning: boolean = false;

  constructor(private controlCenterService: ControlCenterService,
              protected clockService: ClockService,
              private renderer: Renderer2,
              private host: ElementRef,
  ) {
  }

  ngOnInit() {
    this.items$ = this.controlCenterService.items$
    this.controlCenterService.statusChange$.pipe(skip(1)).subscribe(_ => this.updatePosition())
  }

  get controlCenterHeight() {
    return (this.controlCenter.nativeElement as HTMLDivElement).offsetHeight
  }

  get translateY() {
    return (this.currentPosition / this.controlCenterHeight) * 100
  }

  getItemIcon(item: ControlCenterOption): string {
    if (!item.active && item.inactiveIcon) {
      return item.inactiveIcon
    }
    return item.activeIcon
  }

  @HostBinding('style.visibility')
  get display() {
    return this.controlCenterService.isOpen ? 'visible' : 'hidden'
  }

  @HostListener('click', ['$event'])
  onBackdropClick(event: MouseEvent) {
    if (event.target == this.host.nativeElement && !this.panning) {
      this.openControlCenter = false
    }
  }

  @HostListener('pan', ['$event'])
  onPan(event: any) {
    if (event.additionalEvent == 'panup' || event.additionalEvent == 'pandown') {
      this.currentPosition = Math.max(-this.controlCenterHeight, Math.min(0, event.deltaY))
      this.updatePosition();
      this.panning = true
    }
    if (event.isFinal) {
      this.openControlCenter = (this.currentPosition > -this.controlCenterHeight / 2)
      setTimeout(() => this.panning = false, 1000)
    }
  }

  private updatePosition() {
    this.renderer.setStyle(this.host.nativeElement,
      '--control-center-translate-y',
      this.translateY + '%',
      RendererStyleFlags2.DashCase
    )
    this.renderer.setStyle(this.host.nativeElement,
      '--control-center-backdrop-color',
      `rgba(0, 0, 0, ${0.5 - Math.abs(this.translateY) / 200})`,
      RendererStyleFlags2.DashCase
    )
  }

  private set openControlCenter(open: boolean) {
    this.currentPosition = open ? 0 : -this.controlCenterHeight
    this.updatePosition()
    setTimeout(() => this.controlCenterService.isOpen = open, 500)
  }
}
