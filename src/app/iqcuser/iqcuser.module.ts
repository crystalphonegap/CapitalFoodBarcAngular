import { NgModule } from '@angular/core';
import {  DatePipe } from '@angular/common';
import { PagesRoutingModule } from './IqcUserRoutingModule';
import { SharedModule } from '../Shared/SharedModule';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PaginationService } from '../CustomComponents/pagination/pagination.service';
import { DocumentNoWiseEntryComponent } from './document-no-wise-entry/document-no-wise-entry.component';
import { IqcUserMasterComponent } from './iqc-user-master/iqc-user-master.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PendingDocumentListComponent } from './pending-document-list/pending-document-list.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@NgModule({
  declarations: [DocumentNoWiseEntryComponent,
    IqcUserMasterComponent,
    PartyListComponent,
    PendingDocumentListComponent,
    DocumentDetailsComponent],
  
  imports: [
    PagesRoutingModule,
    SharedModule, 
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),

  ],
  providers: [
    DatePipe,
    { provide: ToastrService, useClass: ToastrService },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    PaginationService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class IqcuserModule { }
