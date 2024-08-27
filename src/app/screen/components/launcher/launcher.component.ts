import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LauncherItem, LauncherConfig, LauncherService} from "../../services";
import {Observable, of, switchMap, tap} from "rxjs";
import {
  launcherScrollAnimationTrigger,
  LauncherScrollState
} from "./launcher-scroll.animation";

@Component({
  selector: 'phone-launcher',
  templateUrl: './launcher.component.html',
  styleUrl: './launcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    launcherScrollAnimationTrigger,
    // launcherScrollChildAnimationTrigger
  ],
  providers: [
    LauncherService
  ]
})
export class LauncherComponent implements OnInit, AfterViewInit {
  protected configs$!: Observable<LauncherConfigTransformed>
  scrollState: LauncherScrollState = 'change'
  swiperParams = {deltaX: 0, position: 0}
  // slidesState: { [p: string]: LauncherSlideState } = {};
  // slideParams: { [p: string]: any } = {}

  @ViewChild('windowSwiper', {static: false}) swipeContainer!: ElementRef<HTMLDivElement>

  constructor(private launcherService: LauncherService) {
  }

  ngOnInit() {
    this.configs$ = this.launcherService.configs$.pipe(
      switchMap(config => {
        return of({
          ...config,
          bullets: config.slides.map((_, index) => index),
          staticArea: this.generateArea([config.quickMenu]),
          slidesArea: config.slides.map(slide => this.generateArea(slide))
        })
      }),
      tap(config => {
        this.swiperParams = {
          ...this.swiperParams,
          position: this.slideWidth * config.current * -1
        }
        // for (let i = 0; i < config.slides.length; i++) {
        //   this.slidesState[i] = 'none'
        //   this.slideParams[i] = {opacity: 1, angle: 0}
        // }
      }))
  }

  ngAfterViewInit() {
    this.swiperParams = {
      ...this.swiperParams,
      position: this.slideWidth * this.launcherService.config.current * -1
    }
  }

  private get slideWidth() {
    if (!this.swipeContainer) return 0
    return this.swipeContainer.nativeElement.getBoundingClientRect().width / this.launcherService.config.slides.length
  }

  private generateArea(data: LauncherItem[][]) {
    let appList: LauncherItem[] = []
    let area = ''
    for (let apps of data) {
      apps = this.parseApps(apps)
      appList.push(...apps)
      area += `\"${apps.map(app => app.id).join(' ')}\"`
    }
    let appsSet = new Array<LauncherItem>
    for (const app of appList) {
      if (appsSet.find((_app) => _app.id == app.id) == undefined) {
        appsSet.push(app)
      }
    }
    return {
      apps: appsSet, area
    }
  }

  private parseApps(data: LauncherItem[]) {
    let apps: LauncherItem[] = []
    for (const app of data) {
      if (apps.find((_app) => _app.name == app.name) == undefined) {
        apps.push(app)
      } else if (!app.name.startsWith('widget')) {
        apps.push({...app, id: app.id + apps.length})
      } else {
        apps.push(...apps.slice(-1))
      }
    }
    return apps
  }

  onSlidesPan(event: any) {
    let dx: number;
    if (event.isFinal) {
      if (event.distance > this.slideWidth * 2 / 3)
        this.launcherService.switch(event.deltaX)
      this.scrollState = 'change'
      dx = 0
    } else {
      this.scrollState = 'move'
      dx = event.distance <= this.slideWidth ? event.deltaX : 0
    }
    this.swiperParams = {
      ...this.swiperParams,
      deltaX: dx,
    }
    console.log(event, dx, this.swiperParams)
  }
}

interface LauncherConfigTransformed extends LauncherConfig {
  bullets: number[];
  staticArea: {
    apps: LauncherItem[];
    area: string;
  };
  slidesArea: {
    apps: LauncherItem[];
    area: string;
  }[];
}
