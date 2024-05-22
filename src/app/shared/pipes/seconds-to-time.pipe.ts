import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime',
  standalone: true,
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'string') {
      return value;
    }

    const hours = Math.floor((value % (24 * 3600)) / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const remainingSeconds = value % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;

  }

  private pad(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }

}
