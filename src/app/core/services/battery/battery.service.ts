import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export interface Battery {
  level: number,
  charging: boolean
  chargingTime: number
  dischargingTime: number
}

@Injectable({
  providedIn: 'root'
})
export class BatteryService implements OnInit {

  protected changeSubject$!: BehaviorSubject<Battery>
  protected _battery!: Battery
  change$!: Observable<Battery>

  constructor() {
    this._battery = {
      level: 100,
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
    } as Battery
    this.changeSubject$ = new BehaviorSubject(this.battery)
    this.change$ = this.changeSubject$.asObservable()
  }

  get battery() {
    return this._battery
  }

  private update(part: Object) {
    this._battery = {
      ...this.battery,
      ...part
    }
    this.changeSubject$.next(this._battery)
  }

  ngOnInit(): void {
    if (!('getBattery' in navigator))
      return;
    try {
      (navigator as any).getBattery().then((battery: any) => {
        this.update({
          level: Math.round(battery.level * 100),
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        })
        battery.addEventListener("chargingchange", () => {
          this.update({
            charging: battery.charging
          })
        });

        battery.addEventListener("levelchange", () => {
          this.update({
            level: Math.round(battery.level * 100)
          })
        });

        battery.addEventListener("chargingtimechange", () => {
          this.update({
            chargingTime: battery.chargingTime
          })
        });

        battery.addEventListener("dischargingtimechange", () => {
          this.update({
            dischargingTime: battery.dischargingTime
          })
        });

      });
    } catch (e) {
    }

  }
}
