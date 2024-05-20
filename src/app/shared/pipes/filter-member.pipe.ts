import { Pipe, PipeTransform } from '@angular/core';
import { ETeamTypeId } from 'src/app/enums/team.enums';
import { IUserNotPaddingResponse } from 'src/app/interfaces/add-edit-project.interface';


@Pipe({
  name: 'filterMember',
  standalone: true
})
export class FilterMemberPipe implements PipeTransform {

  transform(value: IUserNotPaddingResponse[], ...args: [string, number, string]): IUserNotPaddingResponse[] {
    const [selectedBranch, selectedType, searchUser] = args;

    return value.filter(member =>
      (selectedBranch === 'All' || member.branchDisplayName === selectedBranch) &&
      (selectedType === ETeamTypeId.All || member.type === selectedType) &&
      (!searchUser || member.name.toLowerCase().includes(searchUser.toLowerCase()))
    );
  }

}
