import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type PageStep = 'default' | 'compliments' | 'options' | 'secret' | 'result';

@Injectable()
export class PageFacade {
  step$ = new BehaviorSubject<PageStep>('default');
}