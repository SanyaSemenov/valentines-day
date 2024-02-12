import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, HostBinding, inject } from '@angular/core';
import { PageFacade } from '../page';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'maggie',
  templateUrl: './maggie.component.html',
  styleUrls: ['./maggie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
})
export class MaggieComponent {
  @Input() angry = false;
  @Input() eyes = '';

  readonly facade = inject(PageFacade);
}