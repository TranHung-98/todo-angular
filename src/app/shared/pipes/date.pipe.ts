import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: Date): string {
    return new Date(value).toLocaleDateString('vi-VN');
  }
}
