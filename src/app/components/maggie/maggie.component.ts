import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, HostBinding, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageFacade } from '../page';
import { LazyLoadImageModule, StateChange } from 'ng-lazyload-image';
import { environment } from 'src/environment/environment';
import { PopupComponent } from '../popup/popup.component';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'maggie',
  templateUrl: './maggie.component.html',
  styleUrls: ['./maggie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule, PopupComponent, ReactiveFormsModule],
  animations: [fadeInOut({ withTransform: false })]
})
export class MaggieComponent{
  @Input() angry = false;
  @Input() eyes = '';

  readonly facade = inject(PageFacade);
}