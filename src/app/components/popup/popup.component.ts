import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopupAlign } from './popup-align';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule]
})
export class PopupComponent {
	constructor() {}

	@Input() public isVisible: boolean = false;
	@Input() public text: string;
	@Input() public alignment: PopupAlign = PopupAlign.Top;
	@Input() public isUpsideDown: boolean = false;
}
