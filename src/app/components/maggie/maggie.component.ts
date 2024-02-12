import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, HostBinding, inject } from '@angular/core';
import { PageFacade } from '../page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { environment } from 'src/environment/environment';
import { PopupComponent } from '../popup/popup.component';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';

@Component({
  selector: 'maggie',
  templateUrl: './maggie.component.html',
  styleUrls: ['./maggie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule, PopupComponent],
  animations: [fadeInOut({ withTransform: false })]
})
export class MaggieComponent {
  @Input() angry = false;
  @Input() eyes = '';

  readonly facade = inject(PageFacade);

  readonly dafaultImage = `${environment.basePath}/assets/maggie-default.png`;
  readonly angryImage = `${environment.basePath}/assets/maggie-angry.png`;
}