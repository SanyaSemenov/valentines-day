import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
})
export class ImageCardComponent {
  @Input() source = '';
}