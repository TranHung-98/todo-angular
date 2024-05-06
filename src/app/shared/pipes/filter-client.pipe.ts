import { Pipe, PipeTransform } from '@angular/core';
import { ICustomerResponse } from 'src/app/interfaces/add-edit-project.interface';

@Pipe({
  name: 'filterClient',
  standalone: true
})
export class FilterClientPipe implements PipeTransform {

  transform(value: ICustomerResponse[], ...args: string[]): ICustomerResponse[] {
    const filteredClients = value.filter(client => client.name.toLowerCase().includes(args[0].toLowerCase()));
    if (filteredClients.length === 0) {
      return [{ name: 'No matching found', id: 0, code: '' }];
    }
    return filteredClients;
  }

}
