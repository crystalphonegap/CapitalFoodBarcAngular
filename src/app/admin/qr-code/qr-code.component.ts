import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service'; 
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';
import { HomeService } from 'src/app/Shared/HomeService';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})

export class QrCOdeComponent implements OnInit {

  @ViewChildren('input') inputs: QueryList<ElementRef>;
  constructor(private changeDetection: ChangeDetectorRef,private _HomeService:HomeService,private  _SoloAdminMasterComponent:SoloAdminMasterComponent,
     private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService, private renderer: Renderer2) { }
  CurrentIndex = 0;
  TestData: any = [];
  ItemCode: string;
  ProductDescription: string;
  BalanceQuantity: string;
  ScannedCount=0;

  PartyName:string='';
  DC:string='';
  Date:string='';
  ngOnInit(): void {
    this.PartyName=localStorage.getItem('PartyName');
    this.DC=localStorage.getItem('DC');
    this.Date =localStorage.getItem('Date');
    this.ItemCode = localStorage.getItem('ItemCode');
    this.ProductDescription = localStorage.getItem('ProductDescription');
    this.BalanceQuantity = localStorage.getItem('BalanceQuantity');
    let BalanceQuantity= parseInt(  localStorage.getItem('BalanceQuantity'),10) 
    for (let count: number = 0; count <BalanceQuantity ; count++) {
      this.TestData.push({ Barcode: '' });
    }
    this.getCount();
    this.getAllData();
  }


  getAllData() { 
    this._SoloAdminMasterComponent.setLoading(true);
    let model ={ 
      PartyName:localStorage.getItem('PartyName'),
      DC:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
      ItemCode:localStorage.getItem('ItemCode'),
    }
    this._HomeService.GetQrCodeList(model).subscribe((res: any) => {  
      this._SoloAdminMasterComponent.setLoading(false);  
      if(res!==null){
        this.setQR(res);

      }
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloAdminMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  }   
setQR(Data){
  for (let i: number = 0; i < Data.length; i++) {
      if (Data[i].Barcode == '' ||  Data[i].Barcode==null) {
        this.TestData[i].Barcode =Data[i].Barcode ;
      } 
    }

  this.getCount();
}
  SetCurrentIndex(i) {
    this.CurrentIndex = i;
  }

  onDataChange() {
    // for (let i: number = 0; i < this.TestData.length; i++) {
    //   if ( this.TestData[i].Barcode == '' ||   this.TestData[i].Barcode==null) {
    //   } 
    // }

  }

  ngAfterViewInit() {
    const element = this.renderer.selectRootElement('#input0');
    setTimeout(() => element.focus(), 0);
  }

  ValueChanged(Value, Index) {
    this.TestData[Index].Barcode = '';
    this.TestData[Index].Barcode = Value;
    if (Index != this.TestData.length) {
      let count = Index + 1;
      var selectedelement = '#input' + count.toString();
      const element = this.renderer.selectRootElement(selectedelement);
      setTimeout(() => element.focus(), 0);
    }
    // if (this.TestData[this.TestData.length - 2].Barcode != '' && this.TestData[this.TestData.length - 2].Barcode != null) {
    //   this.TestData.push({ Barcode: '' });

    // }
    this.getCount();
  }
  getCount() {
    this.ScannedCount = 0
    for (let count : number = 0; count < this.TestData.length; count++) {
      if (this.TestData[count].Barcode != null && this.TestData[count].Barcode != '') {
        this.ScannedCount++;
      }
    }
    return;
  }

  Delete(Index) {
    this.TestData[Index].Barcode = '';
    this.getCount();
    this.changeDetection.detectChanges();
  }
  Back() {
    this.router.navigateByUrl('/User/ItemList');
  }
}