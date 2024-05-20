import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/sweetalert/service/sweetalert.service';
import { ICustomerResponse, ICustomerSaveRequest } from 'src/app/interfaces/add-edit-project.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEditApiService } from '../service/add-edit-api.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnDestroy {
  clientForm = this.fb.group({
    nameClient: ['', Validators.required],
    codeClient: ['', Validators.required],
    addressClient: ['', Validators.required],
  });
  destroy$ = new Subject<void>();
  clientAdded = new EventEmitter<ICustomerResponse>();

  constructor(
    private fb: FormBuilder,
    private projectApiService: AddEditApiService,
    private sweetalertSevice: SweetAlertService,
    private dialogRef: MatDialogRef<AddClientComponent>
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSaveClient() {
    if (this.clientForm.value.nameClient && this.clientForm.value.codeClient && this.clientForm.value.addressClient) {
      const client: ICustomerSaveRequest = {
        name: this.clientForm?.value?.nameClient.toString(),
        code: this.clientForm.value.codeClient.toString(),
        address: this.clientForm.value.addressClient.toString()
      };
      this.projectApiService.saveCustomer(client)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
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
            this.sweetalertSevice.fireErrorAlert('', err.error.error.message, 2000, true, false, 'bottom-end', 'Ok', '#7066e0');
          }
        });
    }
    this.dialogRef.close();
  }
}
