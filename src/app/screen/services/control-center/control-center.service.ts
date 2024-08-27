import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
  matAirplanemodeActiveOutline,
  matAirplanemodeInactiveOutline,
  matBluetoothDisabledOutline,
  matBluetoothOutline,
  matFlashlightOffOutline,
  matFlashlightOnOutline, matLocationOffOutline, matLocationOnOutline,
  matNotificationsActiveOutline,
  matNotificationsOffOutline, matRemoveCircleOutline,
  matScreenRotationOutline,
  matScreenshotOutline,
  matSyncAltOutline,
  matWifiOffOutline,
  matWifiOutline,
  matWifiTetheringOffOutline,
  matWifiTetheringOutline
} from "@ng-icons/material-icons/outline";

interface ControlCenterItem {
  name: string,
  active: boolean,
  activeIcon: string,
  inactiveIcon?: string,
  toggle?: VoidFunction
}

type ControlCenterItems = { [key: string]: ControlCenterItem }

export interface ControlCenterOption extends ControlCenterItem {
  key: string

}

@Injectable()
export class ControlCenterService {
  protected _itemsSubject$!: BehaviorSubject<ControlCenterOption[]>
  private _opened: boolean = false;
  private _stateSubject$!: BehaviorSubject<boolean>

  constructor() {
    this._itemsSubject$ = new BehaviorSubject(this.create())
    this._stateSubject$ = new BehaviorSubject(this._opened)
  }

  get items$() {
    return this._itemsSubject$.asObservable()
  }

  get statusChange$() {
    return this._stateSubject$.asObservable()
  }

  get isOpen() {
    return this._stateSubject$.value
  }

  private create(): ControlCenterOption[] {
    return Object.entries(this.options).map((value) => {
      return {
        key: value[0],
        ...value[1]
      }
    });
  }

  set isOpen(opened: boolean) {
    if (opened == this.isOpen)
      return
    this._opened = opened
    this._stateSubject$.next(opened)
  }

  protected options: ControlCenterItems = {
    wifi: {
      name: "wifi",
      active: false,
      activeIcon: matWifiOutline,
      inactiveIcon: matWifiOffOutline
    },
    network: {
      name: "connecté",
      active: false,
      activeIcon: matSyncAltOutline,
    },
    bluetooth: {
      name: "bluetooth",
      active: false,
      activeIcon: matBluetoothOutline,
      inactiveIcon: matBluetoothDisabledOutline
    },
    volume: {
      name: "sonnerie",
      active: false,
      activeIcon: matNotificationsActiveOutline,
      inactiveIcon: matNotificationsOffOutline
    },
    flashlight: {
      name: "Torche",
      active: false,
      activeIcon: matFlashlightOnOutline,
      inactiveIcon: matFlashlightOffOutline
    },
    airplane: {
      name: "Mode Avion",
      active: false,
      activeIcon: matAirplanemodeActiveOutline,
      inactiveIcon: matAirplanemodeInactiveOutline
    },
    wifiTethering: {
      name: "Point D'accès",
      active: false,
      activeIcon: matWifiTetheringOutline,
      inactiveIcon: matWifiTetheringOffOutline
    },
    orientation: {
      name: "Rotation Automatique",
      active: false,
      activeIcon: matScreenRotationOutline
    },
    screenshot: {
      name: "Capture D'écran",
      active: false,
      activeIcon: matScreenshotOutline,
    },
    location: {
      name: "Localisation",
      active: false,
      activeIcon: matLocationOnOutline,
      inactiveIcon: matLocationOffOutline
    },
    noDisturb: {
      name: "ne pas déranger",
      active: false,
      activeIcon: matRemoveCircleOutline,
    }
  }
}
