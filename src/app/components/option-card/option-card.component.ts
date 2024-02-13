import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Option } from '../page/page.facade';
import { BehaviorSubject } from 'rxjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import * as QRCode from 'qrcode';

@Component({
  selector: 'option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
  animations: [fadeInOut({ withTransform: false, duration: 150 })]
})
export class OptionCardComponent implements AfterViewInit {
  @Input() option?: Option | null = null;
  @Input() qrValue = '';

  videoLoaded$ = new BehaviorSubject(false);

  @ViewChild('canvasRef', { read: ElementRef }) private canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  ngAfterViewInit(): void {
    if (this.canvasRef?.nativeElement && this.qrValue) {
      QRCode.toCanvas(this.canvasRef?.nativeElement, `don't try to read this ${this.qrValue}, love you ♥`, {
        margin: 0,
        width: 250,
        color: {
          dark: '#652b63',
          light: '#ffffff'
        }
      });
    }
  }

  download(): void {
    if (this.canvasRef?.nativeElement) {
      var link = document.createElement('a');
      link.download = 'valentines-ticket.png';
      link.href = this.canvasRef.nativeElement.toDataURL()
      link.click();
    } 
  }
}