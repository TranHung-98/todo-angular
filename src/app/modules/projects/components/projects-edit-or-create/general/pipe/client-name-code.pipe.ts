import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCode',
  standalone: true
})
export class ClientNameCodePipe implements PipeTransform {

  transform(name: string, code: string): string {
    return `${name} - [${code}]`;
  }

}
