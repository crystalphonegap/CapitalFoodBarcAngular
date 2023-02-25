import { IQCService } from './../../Shared/IQCService';
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
const moment = _moment; 

@Component({
  selector: 'app-pending-document-list',
  templateUrl: './pending-document-list.component.html',
  styleUrls: ['./pending-document-list.component.scss']
})
export class PendingDocumentListComponent implements OnInit {
 // public format = 'dd/MM/yyyy';
  DataList: any=[];
  From_Date = new Date();
  To_Date = new Date();
  constructor(private router: Router, public DatePipe:DatePipe,public toastr: ToastrService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _HomeService:HomeService ,
    private  _IqcUserMasterComponent:IqcUserMasterComponent,private alertService: AlertService,
    public paginationService : PaginationService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService,private _IQCService:IQCService) { }
  pageNo: any = 1;
  Indexing:number=1;
  pageNumber: boolean[] = [];
  pageField = [];
  DataPerPage:number=10;
  pageFieldLength :number;
  exactPageList: any;
  Fdate:any;
  Tdate:any;
  paginationData: number;
  SearchFilter= new FormGroup({  
    FromDate: new FormControl( new Date() ),
    ToDate: new FormControl( new Date() ),
  });
  search = null;
  totalData: any;
  totalDataCount: any;
  currentPage = 1;
  PageSize:any;
  ngOnInit() {
    this.GETIQCpendingList(1);
  }

  GetData()
  {
    this.GETIQCpendingList(1)
  }
  Edit(value)
  {

localStorage.setItem("DocumentId",value);
this.router.navigateByUrl('/IQC/DocumentDetails');
  }
  Add()
  {
    localStorage.setItem("DocumentId",'0');
this.router.navigateByUrl('/IQC/DocumentDetails');
  }
  GETIQCpendingList(pageNo)
  {
    debugger;
    this.pageNo =pageNo;
    this.Indexing=pageNo-1;
    this.Indexing=this.Indexing*10;
    this.PageSize=10
  this.Fdate=this.SearchFilter.controls['FromDate'].value;
  this.Tdate=this.SearchFilter.controls['ToDate'].value;
   debugger;
    this._IqcUserMasterComponent.setLoading(true);
    this._IQCService.GetIQCPendingList(pageNo,this.PageSize, this.DatePipe.transform(this.Fdate, 'yyyy-MM-dd'), this.DatePipe.transform(this.Tdate, 'yyyy-MM-dd') ).subscribe((res: any) => {  
      this._IqcUserMasterComponent.setLoading(false);
     
      if(res.length!=0)
      {
        this.totalDataCount = res[0].TotalRows;
        this.totalNoOfPages();
        this.DataList = res;  
      }
      this.changeDetection.detectChanges();
    },
    err => { 
      this._IqcUserMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });
  }

  showDataByPageNumber(page, i) {
    this.DataList = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.GETIQCpendingList(this.currentPage);
    this.changeDetection.detectChanges();
  }

  //Pagination Start  

  showPrevData() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.GETIQCpendingList(this.currentPage);
      this.changeDetection.detectChanges();
    }

  }

  showNextData() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.GETIQCpendingList(this.currentPage);
      this.changeDetection.detectChanges();
    }
  }
 
  totalNoOfPages() {

    this.paginationData = Number(this.totalDataCount / this.DataPerPage);
    let tempPageData = this.paginationData.toFixed();
    if (Number(tempPageData) < this.paginationData) {
      this.exactPageList = Number(tempPageData) + 1;
      this.paginationService.exactPageList = this.exactPageList;
    } else {
      this.exactPageList = Number(tempPageData);
      this.paginationService.exactPageList = this.exactPageList
    }
    this.paginationService.pageOnLoad();
    if (this.totalDataCount > this.DataPerPage) {
      this.pageField = this.paginationService.pageField;
    }
    else {
      this.pageField = [1];
    }
    this.pageFieldLength=this.pageField.length ;
    this.changeDetection.detectChanges();
  }

}
