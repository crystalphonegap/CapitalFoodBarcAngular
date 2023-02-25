import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentNoWiseEntryComponent } from './document-no-wise-entry/document-no-wise-entry.component';
import { IqcUserMasterComponent } from './iqc-user-master/iqc-user-master.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PendingDocumentListComponent } from './pending-document-list/pending-document-list.component';
 

const routes: Routes = [
    {
        path: '',
        component:IqcUserMasterComponent,
        children: [
    { path: '', redirectTo: 'PendingDocumentList', pathMatch: 'full' },
    { path: 'PartyList', component: PartyListComponent },
    { path: 'DocumentNoWiseEntry', component: DocumentNoWiseEntryComponent },
    { path: 'PendingDocumentList', component: PendingDocumentListComponent },
    { path: 'DocumentDetails', component: DocumentDetailsComponent },

        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }