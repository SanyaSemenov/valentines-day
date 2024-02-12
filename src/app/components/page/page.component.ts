import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PageFacade } from './page.facade';
import { FlyingHeartsComponent } from '../flying-hearts/flying-hearts.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MaggieComponent } from '../maggie/maggie.component';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FlyingHeartsComponent, LazyLoadImageModule, MaggieComponent],
  providers: [PageFacade],
})
export class PageComponent {
  readonly facade = inject(PageFacade);
}