import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {Injectable, Provider} from "@angular/core";
import {DIRECTION_ALL} from "hammerjs";

@Injectable({
  providedIn: "root"
})
export class PhoneHammerGestureConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: {
      direction: DIRECTION_ALL,
    }
  }
}

export function provideHammerConfig(): Provider {
  return {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: PhoneHammerGestureConfig
  }
}
