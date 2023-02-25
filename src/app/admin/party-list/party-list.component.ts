import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Common/modal.service';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { HomeService } from 'src/app/Shared/HomeService';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent implements OnInit {

  public format = 'dd/MM/yyyy';
  DataList: any=[];
  From_Date = new Date();
  To_Date = new Date();
  constructor(private router: Router, public DatePipe:DatePipe,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, 
    private  _SoloCommonMasterComponent:SoloAdminMasterComponent,private alertService: AlertService,
    public paginationService : PaginationService,private _HomeService:HomeService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService) { }
  pageNo: any = 1;
  Indexing:number=1;
  loadedFromDate;
  LoadedToDate;
  pageNumber: boolean[] = [];
  Status = 'All';
  Keyword;
  pageField = [];
  DataPerPage:number=10;
  pageFieldLength :number;
  exactPageList: any;
  paginationData: number;
  SearchFilter;
  search = null;
  totalData: any;
  totalDataCount: any;
  currentPage = 1;
  Confimation='';
  DBirth;
  locale: string = 'en-US';
  DJoin;
   ngOnInit() {
    this.DBirth = new Date();
    this.DBirth = '01-08-2021'; 
    // this.DBirth = this.DatePipe.transform(this.DBirth, 'dd-MM-yyyy',this.locale); 
    this.DJoin = new Date();
    this.DJoin = this.DatePipe.transform(this.DJoin, 'dd-MM-yyyy',this.locale); 
    this.SearchFilter = new FormGroup({  
      FromDate: new FormControl( this.DBirth, [Validators.required, Validators.maxLength(256)]),
      ToDate: new FormControl( this.DJoin , [Validators.required, Validators.maxLength(256)]),
    });
    this.loadedFromDate=true;
    this.LoadedToDate=true; 
    //  this.SearchChanges();

    //  this.totalDataCount = 1;
    //   this.totalNoOfPages();
      this.changeDetection.detectChanges();
  }

  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.DatePipe.transform(tempData, 'MM-dd-yyyy');
  }
  changeDateLoad(value){
    if(value=='From'){
  this.loadedFromDate=false

    }
    else  if(value=='To'){
   this.LoadedToDate=false
          }
  }
  ChangeFilter(){
    // this.pageNumber = [];
    // this.pageNumber[0] = true;
    // this.paginationService.temppage = 0;
    // this.currentPage=1;
    // this.search=this.SearchFilter.controls['search'].value;
    this.SearchChanges();
  }
  SearchChanges(){
    if(this.SearchFilter.controls['FromDate'].value===null ||this.SearchFilter.controls['FromDate'].value===''){
      this.alertService.error('Please Select  From Date');

    }
    if(this.SearchFilter.controls['ToDate'].value===null ||this.SearchFilter.controls['ToDate'].value===''){
      this.alertService.error('Please Select  To Date');
    }
    let model ={
      UserCode:localStorage.getItem('UserCode'),
      UserType:localStorage.getItem('UserType'),
      FromDate:this.DatePipe.transform(this.SearchFilter.controls['FromDate'].value, 'dd-MM-yyyy', this.locale),
      ToDate:this.DatePipe.transform(this.SearchFilter.controls['ToDate'].value, 'dd-MM-yyyy', this.locale),
    }
    this.getAllData(model);
  }
   getAllData(model) {
  //   this.pageNo =pageNo;
  //   this.Indexing=pageNo-1;
  //   this.Indexing=this.Indexing*10;
    this._SoloCommonMasterComponent.setLoading(true);
    this._HomeService.GetPartyList(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false);
      // this.getAllDataCount();
      this.DataList = res;  
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  }     
  getAllDataCount() {
    let model ={ 
      Keyword:this.search,
    }
    // this._DoctorService.GetAllDoctorDetailsCount(model).subscribe((data: any) => {
    //   this.totalDataCount = data;
    //   this.totalNoOfPages();
    //   this.changeDetection.detectChanges();
    // })

  }
  showDataByPageNumber(page, i) {
    this.DataList = [];
    this.pageNumber = [];
    this.pageNumber[i] = true;
    this.pageNo = page;
    this.currentPage = page;
    this.getAllData(this.currentPage );
    this.changeDetection.detectChanges();
  }

  //Pagination Start  

  showPrevData() {

    if (this.paginationService.showNoOfCurrentPage != 1) {
      this.paginationService.prevPage();
      this.pageNumber = [];
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage );
      this.changeDetection.detectChanges();
    }

  }

  showNextData() {

    if (this.paginationService.disabledNextBtn == false) {
      this.pageNumber = [];
      this.paginationService.nextPage();
      this.pageNumber[0] = true;
      this.currentPage = this.paginationService.pageField[0];
      this.getAllData(this.currentPage );
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

  Edit(ID,PartyName,DC,Date){
    localStorage.setItem('PartyName',PartyName);
    localStorage.setItem('DC',DC);
    localStorage.setItem('Date',Date); 
    localStorage.setItem('ID',ID); 
    this.router.navigateByUrl('/Admin/ItemList');
  }
  
  ChangeVisiblety(ID,mode){
    this.DataList[ID].visible =mode;
  }
  
  // 
  Delete(Value){
    this.alertService.clear();
    // this._SoloCommonMasterComponent.setLoading(true);
    this.changeDetection.detectChanges();
    this.closeModal(Value);
    //  this._PatientService.GlobalDelete("Doctor",Value).subscribe((res: any) => {  
    //   if(res==-7){
    //     this.alertService.info("You can not delete this Doctor , This Doctor is in use ");
    //     this.changeDetection.detectChanges();
    //   }else{
    //     this.alertService.success("Doctor Deleted Successfully");
    //     this.changeDetection.detectChanges();
    //      this.getAllData(1);
    //   }
    //   this._SoloCommonMasterComponent.setLoading(false);
    //   this.changeDetection.detectChanges();
    // },
    // err => { 
    //   this._SoloCommonMasterComponent.setLoading(false);
    //   this.changeDetection.detectChanges();
    //     console.log(err);
    // }); 
  }
 


  Add(){
    this.storage.remove('ID');
    this.router.navigateByUrl('/Admins/DoctorAdd');
  }
  openModal(ID) {
    this.modalService.open('custom-modal-'+ID);
  }
  CheckModal(Value,Id)
  {
  
    this.Confimation = Value;
    if(this.Confimation=="NO")
    {
      this.closeModal(Id);
    }
    
  }
  closeModal(Id) {
    this.modalService.close('custom-modal-'+Id);
  }

  // Send(){
  //   this._HomeService.InsertPartData( this.DataList).subscribe((res: any) => {  
  //     this._SoloCommonMasterComponent.setLoading(false); 
  //     this.changeDetection.detectChanges();
  //   },
  //   err => { 
  //     this._SoloCommonMasterComponent.setLoading(false);
  //     this.changeDetection.detectChanges();
  //       console.log(err);
  //   });  
  // }
}   
