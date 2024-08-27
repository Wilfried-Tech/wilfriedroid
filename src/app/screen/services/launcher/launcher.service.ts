import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class LauncherService {

  protected configSubject$!: BehaviorSubject<LauncherConfig>
  configs$!: Observable<LauncherConfig>

  constructor() {
    this.configSubject$ = new BehaviorSubject(this.defaultConfig)
    this.configs$ = this.configSubject$.asObservable()
  }

  get config() {
    return this.configSubject$.value
  }

  appForName(name: string): LauncherItem {
    return {
      id: name,
      name: name.replace(/_/g, ' '),
      icon: '/assets/images/game.png',
      isWidget: name.startsWith('widget')
    }
  }

  private get defaultConfig(): LauncherConfig {
    return {
      gridSize: {
        col: 4, row: 6
      },
      mainIndex: 0,
      current: 0,
      quickMenu: ['telephone', 'contacts', 'message', 'camera'].map(this.appForName),
      slides: [
        [
          ['widget_time', 'widget_time', 'widget_time', 'widget_time'],
          ['widget_time', 'widget_time', 'widget_time', 'widget_time'],
          ['widget_search', 'widget_search', 'widget_search', 'widget_search'],
          ['widget_search', 'widget_search', 'widget_search', 'widget_search'],
          ['fichiers', 'whatsapp', 'facebook', 'galerie'],
          ['agenda', 'chrome', 'play_store', 'parametre']
        ],
        []
      ].map(arr => arr.map(arr => arr.map(this.appForName)))
    }
  }

  switch(direction: number) {
    let next = 0;
    if (direction > 0 && this.config.current > 0)
      next = this.config.current - 1
    else if (direction < 0 && this.config.current < this.config.slides.length - 1)
      next = this.config.current + 1
    else if (direction == 0)
      next = this.config.mainIndex
    else
      return
    this.configSubject$.next({...this.config, current: next})
  }
}

export interface LauncherItem {
  id: string
  name: string,
  icon: string,
  isWidget: boolean
}

export interface LauncherConfig {
  gridSize: {
    row: number,
    col: number
  },
  mainIndex: number,
  current: number,
  slides: LauncherItem[][][]
  quickMenu: LauncherItem[]
}
