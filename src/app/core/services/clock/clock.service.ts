import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, map, Subscription, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClockService implements OnDestroy {

  private _dateSubject$!: BehaviorSubject<Date>
  private _dateSubscription!: Subscription

  constructor() {
    this._dateSubject$ = new BehaviorSubject(new Date())
    this._dateSubscription = timer(0, 1000).pipe(map(() => new Date())).subscribe(this._dateSubject$)
  }

  get date$() {
    return this._dateSubject$.asObservable()
  }

  ngOnDestroy() {
    this._dateSubscription.unsubscribe()
  }
}
