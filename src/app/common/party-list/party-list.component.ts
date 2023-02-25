import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { ModalService } from 'src/app/CustomComponents/Modal/Solo_Common/modal.service';
import { PaginationService } from 'src/app/CustomComponents/pagination/pagination.service';
import { SoloCommonMasterComponent } from '../solo-Common-master/solo-Common-master.component';
import { HomeService } from 'src/app/Shared/HomeService';
import { ToastrService } from 'ngx-toastr';
import * as _moment from 'moment';
const moment = _moment; 
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
  constructor(private router: Router, public DatePipe:DatePipe,public toastr: ToastrService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private _HomeService:HomeService ,
    private  _SoloCommonMasterComponent:SoloCommonMasterComponent,private alertService: AlertService,
    public paginationService : PaginationService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService) { }
  pageNo: any = 1;
  Indexing:number=1;
  loadedFromDate;
  LoadedToDate;
  pageNumber: boolean[] = [];
  Status = 'All';
  Keyword ;
  pageField = [];
  DataPerPage:number=10;
  pageFieldLength :number;
  exactPageList: any;
  paginationData: number;
  SearchFilter= new FormGroup({  
    FromDate: new FormControl( this.DatePipe.transform(new Date(), 'dd/MM/yyyy', 'en-US') ),
    ToDate: new FormControl( this.DatePipe.transform(new Date(), 'dd/MM/yyyy','en-US')  ),
  });
  search = null;
  totalData: any;
  totalDataCount: any;
  currentPage = 1;
  Confimation='';
  DBirth;
  locale: string = 'en-US';
  DJoin;
  ShowPartyList=false;
  ngOnInit() { 
    this._SoloCommonMasterComponent.SetLogo(true);
    if(localStorage.getItem('FromDate') !== '' && localStorage.getItem('FromDate') !==null ){
      this.DBirth = localStorage.getItem('FromDate') 
      this.DJoin =localStorage.getItem('ToDate'); 
    }
    if(this.DBirth !=='' &&this.DBirth !==null&& this.DBirth !==undefined){
    this.OnLoadGetData();
    this.DBirth = this.DBirth.replace('-','/');
    this.DBirth = this.DBirth.replace('-','/');
    this.DJoin = this.DJoin.replace('-','/');
    this.DJoin = this.DJoin.replace('-','/'); 
    this.SearchFilter.controls['FromDate'].setValue((moment(this.DBirth, "DD-MM-YYYY"))); 
    this.SearchFilter.controls['ToDate'].setValue((moment(this.DJoin, "DD-MM-YYYY")));
 
    }else{
      this.ShowPartyList=false;
      this.DBirth =this.DatePipe.transform(new Date(), 'dd/MM/yyyy', this.locale);
      this.DJoin =this.DatePipe.transform(new Date(), 'dd/MM/yyyy', this.locale);
      this.SearchFilter.controls['FromDate'].setValue(this.DBirth);
      this.SearchFilter.controls['ToDate'].setValue(this.DJoin); 
    }
   
    this.loadedFromDate=true;
    this.LoadedToDate=true; 
    //  this.SearchChanges();

    //  this.totalDataCount = 1;
    //   this.totalNoOfPages();
      this.changeDetection.detectChanges();
  }


  OnLoadGetData(){
    let model ={
      UserCode:localStorage.getItem('UserCode'),
      UserType:localStorage.getItem('UserType'),
      Keyword: 'NoSearch',
      FromDate:this.DBirth,
      ToDate:this.DJoin,
    }
    this.getAllData(model);
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
  OnInput(value){
    this.Keyword=value;
  } 

  SearchChanges(){
    if(this.SearchFilter.controls['FromDate'].value===null ||this.SearchFilter.controls['FromDate'].value==='' ||this.SearchFilter.controls['FromDate'].value===undefined){
      this.alertService.error('Please Select  From Date');
      this.toastr.error('Please Select  From Date');
      return;

    }
    this.DBirth =this.DatePipe.transform(this.SearchFilter.controls['FromDate'].value, 'dd-MM-yyyy', this.locale);
    localStorage.setItem('FromDate',this.DBirth); 
    if(this.SearchFilter.controls['ToDate'].value===null ||this.SearchFilter.controls['ToDate'].value==='' ||this.SearchFilter.controls['ToDate'].value===undefined){
      this.alertService.error('Please Select  To Date');
      this.toastr.error('Please Select  To Date');
      return;

    }
    this.DJoin =this.DatePipe.transform(this.SearchFilter.controls['ToDate'].value, 'dd-MM-yyyy', this.locale);
    localStorage.setItem('ToDate', this.DJoin ); 
    
   let  value= 'NoSearch'
    if(this.Keyword!==null && this.Keyword !=='' && this.Keyword !==undefined){
      value=this.Keyword
   }
   
    let model ={
      UserCode:localStorage.getItem('UserCode'),
      UserType:localStorage.getItem('UserType'),
      Keyword:value,
      FromDate:this.DatePipe.transform(this.SearchFilter.controls['FromDate'].value, 'dd-MM-yyyy', this.locale),
      ToDate:this.DatePipe.transform(this.SearchFilter.controls['ToDate'].value, 'dd-MM-yyyy', this.locale),
    }
    this.getAllData(model);
  }
   getAllData(model) {
    this.ShowPartyList=true; 
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
  Edit(ID,PartyName,DC,Date){
    localStorage.setItem('PartyName',PartyName);
    localStorage.setItem('DC',DC);
    localStorage.setItem('Date',Date); 
    localStorage.setItem('ID',ID); 
    // this.router.navigateByUrl('/User/ItemList');
    this.router.navigateByUrl('/User/BarcodeEntry');
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
}   
