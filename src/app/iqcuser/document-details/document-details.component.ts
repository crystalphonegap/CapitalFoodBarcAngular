import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Common/modal.service';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service'; 
import { HomeService } from 'src/app/Shared/HomeService';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
import { IqcUserMasterComponent } from '../iqc-user-master/iqc-user-master.component';
import { IQCService } from 'src/app/Shared/IQCService';
const moment = _moment; 

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  ModelData: any;
  constructor(private router: Router, public DatePipe:DatePipe,public toastr: ToastrService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _HomeService:HomeService ,
    private  _IqcUserMasterComponent:IqcUserMasterComponent,private alertService: AlertService,
    public paginationService : PaginationService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService,private _IQCService:IQCService) { }
    CurrentIndex = 0;
    DataList: any = [];
    DocNum: string='';
    Date:string='';
    ScannedCount=0; 
    DOCUMENTID:any;
    txtbarcode;
    barcodeValue;
    ProQTY;
   ScanDataList: any = [];
  ngOnInit(){
this.GetDocumentDetails();
this.DocNum=localStorage.getItem("DocumentId");
  }

  Back() {
    this.storage.remove('DocumentId');
    this.router.navigateByUrl('/IQC/PendingDocumentList');
  }
  GetDocumentDetails()
  {
    debugger;
   this.DOCUMENTID=localStorage.getItem("DocumentId");
   console.log(this.DOCUMENTID);
   this.storage.remove('DocumentId');
    this._IqcUserMasterComponent.setLoading(true);
    this._IQCService.GETIQCDOCUMENTDETAILSBYID(this.DOCUMENTID).subscribe((res: any) => {  
      this._IqcUserMasterComponent.setLoading(false);
     
      if(res.length!=0)
      {
        this.DataList = res.Table; 
        this.ScanDataList = res.Table1;  
      }
      this.changeDetection.detectChanges();
    },
    err => { 
      this._IqcUserMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });
  }
  Search()
  {
    debugger;
    localStorage.setItem("DocumentId",this.DocNum);
    this._IqcUserMasterComponent.setLoading(true);
    this._IQCService.GETIQCDOCUMENTDETAILSBYID(this.DocNum).subscribe((res: any) => {  
      this._IqcUserMasterComponent.setLoading(false);
      if(res.length!=0)
      {
        this.DataList = res.Table; 
        this.ScanDataList = res.Table1;  
      }
      console.log(this.DataList);
      this.changeDetection.detectChanges();
    },
    err => { 
      this._IqcUserMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });
  }
  OnInput(value)
  {
    if(value.length>=15)
    {
       this.ModelData={
       'DocEntry':this.DataList[0].DocEntry,
       'U_SerialNumber':this.barcodeValue,
      }
      
       this._IqcUserMasterComponent.setLoading(true);
       this._IQCService.DOCUMENTDEATISLINSERTUPDATE(this.ModelData).subscribe((res: any) => {  
         this._IqcUserMasterComponent.setLoading(false);
         if(res.length!=0)
         {
           this.DataList = res.Table;  
           this.ScanDataList=res.Table1;
         }
         if(this.DataList[0].Message!=''){
           alert(this.DataList[0].Message);
         }
         this.barcodeValue='';
         this.changeDetection.detectChanges();
       },
       err => { 
         this._IqcUserMasterComponent.setLoading(false);
         this.changeDetection.detectChanges();
           console.log(err);
       });
     
    }else{
      
    }
  }
 

}
