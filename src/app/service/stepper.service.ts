import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class Stepper{
    private myBooleanValueSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isOrderValueSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isCompleteValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getBooleanValue(): Observable<boolean> {
    return this.myBooleanValueSubject.asObservable();
  }

  setBooleanValue(value: boolean): void {
    this.myBooleanValueSubject.next(value);
  }

  getisOrderValue(): Observable<boolean> {
    return this.isOrderValueSubject.asObservable();
  }

  setisOrderValue(value: boolean): void {
    this.isOrderValueSubject.next(value);
  }

  getCompleteValue(): Observable<boolean> {
    return this.isCompleteValue.asObservable();
  }

  setCompleteValue(value: boolean): void {
    this.isCompleteValue.next(value);
  }
}