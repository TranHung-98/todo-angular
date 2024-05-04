import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMinuteToHours',
  standalone: true,
})
export class ConvertMinuteToHoursPipe implements PipeTransform {

  transform(minutes: number): string {
    if (minutes === 0) return '';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
    return `${formattedHours}:${formattedMinutes}`;
  }

}
