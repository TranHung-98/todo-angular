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
  keyWord: string = '';
  destroy$ = new Subject<void>();
  clientList: ICustomerResponse[] = [];
  getCustomersSubscription!: Subscription;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private projectFormService: AddEditFormService,
    private projectApiService: AddEditApiService,
  ) { }

  ngOnInit(): void {
    this.getCustomersSubscription = this.projectApiService.getAllCustomers().subscribe((res) => {
      this.clientList = res?.result;
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

  handleFilter(keyword: string): void {
    this.keyWord = keyword;
  }

  searchCustomerChoose(customer: ICustomerResponse): boolean {
    if (
      customer.name.includes(this.keyWord) ||
      customer.code.includes(this.keyWord)
    ) {
      return true;
    } else {
      return false;
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
