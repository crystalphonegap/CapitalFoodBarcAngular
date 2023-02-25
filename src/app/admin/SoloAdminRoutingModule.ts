import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { PartyListComponent } from './party-list/party-list.component';
import { QrCOdeComponent } from './qr-code/qr-code.component';
import { SoloAdminMasterComponent } from './solo-admin-master/solo-admin-master.component';

const routes: Routes = [
    {
        path: '',
        component:SoloAdminMasterComponent,
        children: [
    { path: '', redirectTo: 'PartyList', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },  
    { path: 'PartyList', component: PartyListComponent },
    { path: 'ItemList', component: ItemListComponent },
    { path: 'QRCodeScan', component: QrCOdeComponent },
   
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }