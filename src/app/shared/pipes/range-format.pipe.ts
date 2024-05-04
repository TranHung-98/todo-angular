import { format } from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';
import { ERangeTime } from 'src/app/enums/select-range-time.enums';

@Pipe({
  name: 'rangeFormat',
  standalone: true
})
export class RangeFormatPipe implements PipeTransform {

  transform(date: Date[], ...args: string[]): string {
    if (args[0] === ERangeTime.AllTime) {
      return 'All time';
    }
    else {
      const [startDate, endDate] = date;
      return `${args[0]}: ${format(new Date(startDate), 'dd MMM')} - ${format(new Date(endDate), 'dd MMM yyyy')}`;
    }
  }
}
