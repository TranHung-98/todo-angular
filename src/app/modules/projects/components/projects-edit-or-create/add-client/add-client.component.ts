import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { ICustomerResponse, ICustomerSaveRequest } from 'src/app/interfaces/add-edit-project.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEditService } from '../service/add-edit.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  clientForm = this.fb.group({
    nameClient: ['', Validators.required],
    codeClient: ['', Validators.required],
    addressClient: ['', Validators.required],
  });
  clientAdded = new EventEmitter<ICustomerResponse>();

  constructor(
    private fb: FormBuilder,
    private projectApiService: AddEditService,
    private sweetalertSevice: SweetAlertService,
    private dialogRef: MatDialogRef<AddClientComponent>
  ) { }

  handleSaveClient() {
    if (this.clientForm.value.nameClient && this.clientForm.value.codeClient && this.clientForm.value.addressClient) {
      const client: ICustomerSaveRequest = {
        name: this.clientForm?.value?.nameClient.toString(),
        code: this.clientForm.value.codeClient.toString(),
        address: this.clientForm.value.addressClient.toString()
      };
      this.projectApiService.saveCustomer(client).subscribe({
        next: (response) => {
          this.sweetalertSevice.fireSuccessAlert('', 'Add client successfully', 2000, true, false, 'bottom-end');
          const client: ICustomerResponse = {
            name: response?.result.name,
            code: response?.result.code.toString(),
            id: response?.result.id
          };
          this.clientAdded.emit(client);
        },
        error: (err) => {
          this.sweetalertSevice.fireErrorAlert('', err.error.error.message, 2000, true, false, 'bottom-end');
        }
      });
    }
    this.dialogRef.close();
  }
}
