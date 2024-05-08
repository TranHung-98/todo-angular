import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ICustomerResponse } from 'src/app/interfaces/add-edit-project.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClientComponent } from '../add-client/add-client.component';
import { AddEditFormService } from '../service/add-edit-form.service';
import { AddEditApiService } from '../service/add-edit-api.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnDestroy, OnInit {
  searchClient: string = '';
  destroy$ = new Subject<void>();
  clientList: ICustomerResponse[] = [];
  clientListShow: ICustomerResponse[] = [];
  getCustomersSubscription!: Subscription;
  searchTimeout!: ReturnType<typeof setTimeout>;
  constructor(private projectFormService: AddEditFormService, private projectApiService: AddEditApiService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomersSubscription = this.projectApiService.getAllCustomers().subscribe((res) => {
      this.clientList = res?.result;
      this.clientListShow = this.clientList;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.getCustomersSubscription.unsubscribe();
  }

  get generalForm() {
    return this.projectFormService.getGeneralForm();
  }

  nextRouter() {
    if (this.projectFormService.projectForm.valid) {
      this.router.navigate(['../team',], { relativeTo: this.route });
    }
  }

  onSearchChange(): void {

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.handleFilter();
    }, 500);
  }

  handleFilter(): void {
    this.clientListShow = this.clientList.filter(client => client.name.toLowerCase().includes(this.searchClient.toLowerCase()));
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
