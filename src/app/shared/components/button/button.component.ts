import { ButtonAppearance, ButtonShapeTypes, ButtonSize, ButtonTypes } from './button.type';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonTypes = '';
  @Input() shape: `${ButtonShapeTypes}-${ButtonSize}` = 'rectangle-normal';
  @Input() size: ButtonSize = 'normal';
  @Input() border: boolean = false;
  @Input() appearance: ButtonAppearance = '';

  constructor() { }

  getClass() {
    return this.shape;
  }
}
