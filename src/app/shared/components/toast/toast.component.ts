import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EStatusEnum } from 'src/app/enums/notiff-status.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ToastComponent {
  constructor() { }

  toastStatus = EStatusEnum;

  @Input() title: string = '';
  @Input() icon: string = '';
}
