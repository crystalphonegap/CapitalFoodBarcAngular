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

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit {
 
  DataList: any=[]; 
  constructor(private router: Router, public DatePipe:DatePipe,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, 
    private  _SoloCommonMasterComponent:SoloCommonMasterComponent,
   private alertService: AlertService,private _HomeService:HomeService,
    public paginationService : PaginationService,
    private changeDetection: ChangeDetectorRef,private modalService: ModalService) { }
  locale: string = 'en-US';
  PartyName:string='';
  DC:string='';
  Date:string='';
   ngOnInit() {
    this._SoloCommonMasterComponent.SetLogo(true);
    this.PartyName=localStorage.getItem('PartyName');
    this.DC=localStorage.getItem('DC');
    this.Date =localStorage.getItem('Date');
     this.getAllData();
      this.changeDetection.detectChanges();
  }

  onDateChange(order,event){
    let tempData=event.value._d
    order.OrderRecivedDate=  this.DatePipe.transform(tempData, 'MM-dd-yyyy');
  } 
  getAllData() { 
    this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      PartyName:localStorage.getItem('PartyName'),
      DC:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
    }
    this._HomeService.GetItemList(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false); 
      this.DataList = res;  
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  }    
  Edit(ItemCode,ProductDescription,BALQTY,ProQTY){
    localStorage.setItem('ItemCode',ItemCode);
    localStorage.setItem('ProductDescription',ProductDescription);
    localStorage.setItem('BALQTY',BALQTY);  
    localStorage.setItem('ProQTY',ProQTY);  
    this.router.navigateByUrl('/User/QRCodeScan');
  }
  Back(){
    this.router.navigateByUrl('/User/BarcodeEntry');
  }
  
  ChangeVisiblety(ID,mode){
    this.DataList[ID].visible =mode;
  }
  
}   
