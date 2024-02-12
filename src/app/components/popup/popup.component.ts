import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';

export type PopupAlign = 'top' | 'bottom';

@Component({
	selector: 'popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	animations: [fadeInOut()],
})
export class PopupComponent {
	@Input() isVisible = false;
	@Input() text = '';
	@Input() alignment: PopupAlign = 'top';
	@Input() isUpsideDown = false;
	@Input() caretOffset = '50%';
}
