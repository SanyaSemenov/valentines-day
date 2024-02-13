import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
  providers: [PageFacade],
  animations: [fadeInOut({ withTransform: false })]
})
export class PageComponent {
  readonly facade = inject(PageFacade);

  readonly bgImage = `${environment.basePath}/assets/bg.jpeg`;
  readonly optionsStep$ = new BehaviorSubject(false);

  next(): void {
    this.facade.nextStep();

    setTimeout(() => {
      if (this.facade.step$.value?.name === 'options') {
        this.optionsStep$.next(true);
      }
    }, 1000);
  }
}