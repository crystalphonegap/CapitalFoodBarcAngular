import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BarcodeEntryComponent } from './barcode-entry/barcode-entry.component'; 
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { PartyListComponent } from './party-list/party-list.component';
import { QrCOdeComponent } from './qr-code/qr-code.component';
import { SoloCommonMasterComponent } from './solo-Common-master/solo-Common-master.component';
import { StartComponent } from './start/start.component';


const routes: Routes = [
    {
        path: '',
        component:SoloCommonMasterComponent,
        children: [
    { path: '', redirectTo: 'PartyList', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
    { path: 'Start', component: StartComponent },
    { path: 'PartyList', component: PartyListComponent },
    { path: 'ItemList', component: ItemListComponent },
    { path: 'QRCodeScan', component: QrCOdeComponent },
    { path: 'BarcodeEntry', component: BarcodeEntryComponent }, 
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }