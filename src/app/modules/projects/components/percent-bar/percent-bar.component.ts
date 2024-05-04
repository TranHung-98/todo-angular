import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percent-bar',
  templateUrl: './percent-bar.component.html',
  styleUrls: ['./percent-bar.component.scss']
})
export class PercentBarComponent {
  @Input() percent!: number;
}
