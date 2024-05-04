import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ICustomerResponse } from 'src/app/interfaces/add-edit-project.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { AddEditFormService } from '../../../service/add-edit-form.service';
import { AddEditService } from '../../../service/add-edit.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnDestroy, OnInit {
  clientList: ICustomerResponse[] = [];
  searchClient: string = '';
  destroy$ = new Subject<void>();
  constructor(private projectFormService: AddEditFormService, private projectApiService: AddEditService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectApiService.getAllCustomers().subscribe((res) => this.clientList = res?.result);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get generalForm() {
    return this.projectFormService.getGeneralForm();
  }

  nextRouter() {
    if (this.projectFormService.projectForm.valid) {
      this.router.navigate(['../team',], { relativeTo: this.route });
    }
  }

  handleNewClient() {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '400px',
      height: 'auto',
    });
    dialogRef.componentInstance.clientAdded.pipe(takeUntil(this.destroy$)).subscribe((client) => {
      this.clientList = [client, ...this.clientList];
    });
  }


}
