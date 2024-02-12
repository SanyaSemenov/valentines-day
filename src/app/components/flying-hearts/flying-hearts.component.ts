import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'flying-hearts',
	templateUrl: './flying-hearts.component.html',
	styleUrls: ['./flying-hearts.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
})
export class FlyingHeartsComponent {
	readonly array = Array.from(Array(20).keys());
}
