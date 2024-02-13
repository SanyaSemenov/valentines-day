import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PageFacade } from './page.facade';
import { FlyingHeartsComponent } from '../flying-hearts/flying-hearts.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MaggieComponent } from '../maggie/maggie.component';
import { environment } from 'src/environment/environment';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import { ImageCardComponent } from '../image-card/image-card.component';
import { OptionCardComponent } from '../option-card/option-card.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FlyingHeartsComponent,
    ImageCardComponent,
    LazyLoadImageModule,
    MaggieComponent,
    OptionCardComponent,
  ],
  animations: [fadeInOut({ withTransform: false })]
})
export class PageComponent implements AfterViewInit {
  readonly facade = inject(PageFacade);

  readonly bgImage = `${environment.basePath}/assets/bg.jpeg`;
  readonly optionsStep$ = new BehaviorSubject(false);
  readonly resultStep$ = new BehaviorSubject(false);

  get optionsNotChecked() {
    return !this.facade.options.some(x => x.checked)
  }

  get qrValue() {
    return this.facade.options.filter(x => x.checked).map(x => x.hash).join('_');
  }

  ngAfterViewInit(): void {
    if (this.facade.step$.value?.name === 'result') {
      setTimeout(() => this.resultStep$.next(true), 500);
    }
  }

  next(): void {
    this.optionsStep$.next(false);
    this.facade.nextStep();

    if (this.facade.step$.value?.name === 'options') {
      setTimeout(() => this.optionsStep$.next(true), 1000);
    }

    if (this.facade.step$.value?.name === 'result') {
      setTimeout(() => this.resultStep$.next(true), 500);
    }
  }
}