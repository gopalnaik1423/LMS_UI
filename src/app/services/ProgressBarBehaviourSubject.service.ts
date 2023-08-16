import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProgressBarBehaviourSubject {
  ProgressBarSubject = new BehaviorSubject(this.setStatus);
private ProgressBarStatus = true;
private set setStatus(value) {
   this.ProgressBarSubject.next(value); // this will make sure to tell every subscriber about the change.
   this.ProgressBarStatus = value  ;
 }

private get setStatus() {
   return this.ProgressBarStatus;
 }

 visible(){
  this.setStatus = true;
 }
 hide(){
  this.setStatus = false;
 }
}
