import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/Shared/SharedModule';

import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ModalComponent } from 'src/app/CustomComponents/Modal/Solo_Common/modal.component';

import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './SoloCommonRoutingModule';
import { SoloCommonMasterComponent } from './solo-Common-master/solo-Common-master.component';
import { DemoComponent } from './demo/demo.component';
import { StartComponent } from './start/start.component';
import { PartyListComponent } from './party-list/party-list.component';
import { ItemListComponent } from './item-list/item-list.component';
// import {NgxBarcodeScannerModule} from '../../projects/ngx-barcode-scanner/src/lib/ngx-barcode-scanner.module';
import { QrCOdeComponent } from './qr-code/qr-code.component';
import { BarcodeScannerLivestreamModule, BarcodeScannerLivestreamOverlayModule } from "ngx-barcode-scanner";
import { BarcodeEntryComponent } from './barcode-entry/barcode-entry.component';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
    LoginComponent, SoloCommonMasterComponent, DemoComponent, StartComponent, PartyListComponent, ItemListComponent, QrCOdeComponent, BarcodeEntryComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    BarcodeScannerLivestreamModule,
    BarcodeScannerLivestreamOverlayModule,
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
export class CommonModule { }

