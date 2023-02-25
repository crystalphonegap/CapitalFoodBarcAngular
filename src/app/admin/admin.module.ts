import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './SoloAdminRoutingModule';

import { SoloAdminMasterComponent } from './solo-admin-master/solo-admin-master.component';
import { SharedModule } from 'src/app/Shared/SharedModule'; 
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ModalComponent } from 'src/app/CustomComponents/Modal/Solo_Admin/modal.component';
import { LoginComponent } from './login/login.component'; 
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { ItemListComponent } from './item-list/item-list.component';
import { PartyListComponent } from './party-list/party-list.component';
import { QrCOdeComponent } from './qr-code/qr-code.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

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
  declarations: [
    ModalComponent,
      SoloAdminMasterComponent, 
          LoginComponent, PartyListComponent, ItemListComponent, QrCOdeComponent,
         ],
  imports: [BarcodeScannerLivestreamModule,
    PagesRoutingModule,
    SharedModule,
  ],
  providers: [
  //    DatePipe, 
  // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
   PaginationService, 
   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
]
})
export class AdminModule { }
 
