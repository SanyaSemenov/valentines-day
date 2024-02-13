import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Option } from '../page/page.facade';
import { BehaviorSubject } from 'rxjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule]
})
export class OptionCardComponent {
  @Input() option: Option | null = null;

  videoLoaded$ = new BehaviorSubject(false);
}