import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { count } from 'rxjs/operators';
import { HomeService } from 'src/app/Shared/HomeService';
import { BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamOverlayComponent } from "ngx-barcode-scanner";
import { SoloCommonMasterComponent } from '../solo-Common-master/solo-Common-master.component';
import { AlertService } from 'src/app/CustomComponents/alert.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCOdeComponent implements OnInit { 
  
  @ViewChild(BarcodeScannerLivestreamOverlayComponent)
  barcodeScannerOverlay: BarcodeScannerLivestreamOverlayComponent;


  @ViewChildren('input') inputs: QueryList<ElementRef>;
  constructor(private changeDetection: ChangeDetectorRef,
    private _HomeService:HomeService,private  _SoloCommonMasterComponent:SoloCommonMasterComponent,
     private router: Router,private alertService: AlertService,
      @Inject(SESSION_STORAGE) private storage: WebStorageService, private renderer: Renderer2) { }
  CurrentIndex = 0;
  TestData: any = [];
  ItemCode: string;
  ProductDescription: string;
  BalanceQuantity: string;
  ScannedCount=0;

  PartyName:string='';
  DC:string='';
  Date:string='';
 
 
  barcodeValue;
  ProQTY;
  ngOnInit(): void {
    this._SoloCommonMasterComponent.SetLogo(true);
    this.PartyName=localStorage.getItem('PartyName');
    this.DC=localStorage.getItem('DC');
    this.Date =localStorage.getItem('Date');
    this.ItemCode = localStorage.getItem('ItemCode');
    this.ProductDescription = localStorage.getItem('ProductDescription');
    this.BalanceQuantity = localStorage.getItem('BALQTY');
    this.ProQTY = localStorage.getItem('ProQTY');
    let BalanceQuantity= parseInt(  localStorage.getItem('ProQTY')) 
    for (let count: number = 0; count <BalanceQuantity ; count++) {
      this.TestData.push({ Barcode: '',SerialId:0 });
    }
    this.getAllData();
  }

  BarCodestart(){
    this.barcodeScannerOverlay.show();
  }
  onValueChanges(result,i) {
    this.barcodeValue = result.codeResult.code;
    console.log( this.barcodeValue)
    this.BlurChanged(this.barcodeValue,i);
    this.OnEnterChanged(this.barcodeValue,i);
  }
 
  onStarted(event: boolean): void {
    console.log('started', event);
}

InsertBarCode(Barcode,SerialId,Index) { 
    this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      CardName:localStorage.getItem('PartyName'),
      SeriesName:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
      ItemCode:localStorage.getItem('ItemCode'),
      DocDate:localStorage.getItem('Date'),
      Dscription:localStorage.getItem('ProductDescription'),
      QTY:localStorage.getItem('ProQTY'), 
      SerialId:SerialId, 
      Barcode:Barcode,
    }
    this._HomeService.InsertBarCode(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false);  
      if(res!==null){ 
        this.TestData[Index].SerialId = parseInt(res);
        // if(SerialId===0){
        //   this.alertService.success('BarCode Added');
        // }else{
        //   this.alertService.success('BarCode Updated');
        // }
      }
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  }   

  getAllData() { 
    this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      PartyName:localStorage.getItem('PartyName'),
      DC:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
      ItemCode:localStorage.getItem('ItemCode'),
    }
    this._HomeService.GetQrCodeList(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false);  
      if(res!==null){
        for (let i: number = 0; i < res.length; i++) {
          if (res[i].Barcode !== '' &&  res[i].Barcode!==null) {
            this.TestData[i].Barcode =res[i].Barcode ;
            this.TestData[i].SerialId =res[i].SerialId ;
          } 
        }
        this.ScannedCount=res.length; 
          let Counts=this.ProQTY -res.length;
          this.BalanceQuantity=Counts.toString(); 
          // if( this.ProQTY!==res.length){
          //   var selectedelement = '#input' + this.ScannedCount.toString();
          //   const element = this.renderer.selectRootElement(selectedelement);
          //   setTimeout(() => element.focus(), 0);
          // }

      }else{
        
    this.getCount();
      }
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
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
    // const element = this.renderer.selectRootElement('#input0');
    // setTimeout(() => element.focus(), 0);
  }
 

  OnEnterChanged(Value, Index) {
    if(Value!==''&&Value!==null){
      let counter=0
      for(let count: number =0;count <this.TestData.length;count++){
        if( this.TestData[count].Barcode===Value){
          counter=counter+1
        }
        if(counter===2){
          this.TestData[Index].Barcode = '';
          this.alertService.warn("Barcode Already Exist");
          this.changeDetection.detectChanges();
          return;
        }
  
      }
  this.MoveFocus(Index);
  }
  }

MoveFocus(Index){
  if (Index != this.TestData.length) {
    let count = Index + 1;
    if(this.TestData[count].Barcode==='' ||this.TestData[count].Barcode===null ||this.TestData[count].Barcode===undefined){
      var selectedelement = '#input' + count.toString();
      const element = this.renderer.selectRootElement(selectedelement);
      setTimeout(() => element.focus(), 0);
    }else{
      this.MoveFocus(Index+1);
    }
    
  }  
}

  BlurChanged(Value, Index) {
  //  let Tempfind = this.TestData.find(x=>x.Barcode == Value);
   if(Value!==''&&Value!==null){
     
    let counter=0
    for(let count: number =0;count <this.TestData.length;count++){
      if( this.TestData[count].Barcode===Value){
        counter=counter+1
      }
      if(counter===2){
        this.TestData[Index].Barcode = '';
        this.alertService.warn("Barcode Already Exist");
        this.changeDetection.detectChanges();
        return;
      }

    }
  //  if(Tempfind==='' ||Tempfind===null ||Tempfind===undefined){
      this.InsertBarCode(Value,this.TestData[Index].SerialId,Index);
      this.TestData[Index].Barcode = '';
      this.TestData[Index].Barcode = Value;
      // if (Index != this.TestData.length) {
      //   let count = Index + 1;
      //   var selectedelement = '#input' + count.toString();
      //   const element = this.renderer.selectRootElement(selectedelement);
      //   setTimeout(() => element.focus(), 0);
      // } 
      this.changeDetection.detectChanges();
      this.getCount();
    // }
    
    // else{
    //   this.TestData[Index].Barcode = '';
    //   this.alertService.warn("Barcode Already Exist");
    //   this.changeDetection.detectChanges();
    // }
   }
    
  }

  getCount() {
    this.ScannedCount = 0
    for (let count : number = 0; count < this.TestData.length; count++) {
      if (this.TestData[count].Barcode != null && this.TestData[count].Barcode != '') {
        this.ScannedCount++;
      }
    }
    let Counts=this.ProQTY -this.ScannedCount;
    this.BalanceQuantity=Counts.toString();
    this.changeDetection.detectChanges();
    this.alertService.clear();
    return;
  }

  Delete(Index) {
    this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      CardName:localStorage.getItem('PartyName'),
      SeriesName:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
      ItemCode:localStorage.getItem('ItemCode'),
      DocDate:localStorage.getItem('Date'),
      Dscription:localStorage.getItem('ProductDescription'),
      QTY:localStorage.getItem('ProQTY'), 
      Barcode:this.TestData[Index].Barcode ,
    }
    this.TestData[Index].Barcode = '';
    this.TestData[Index].SerialId = 0;
    
    let count = Index;
    var selectedelement = '#input' + count.toString();
    const element = this.renderer.selectRootElement(selectedelement);
    setTimeout(() => element.focus(), 0);
    this.getCount();
    this._HomeService.DeleteQrCode(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false);  
        this.alertService.success(res); 
        this.changeDetection.detectChanges(); 
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  


  }

  Back() {
    this.router.navigateByUrl('/User/ItemList');
  }

  BackBarcode() {
    this.router.navigateByUrl('/User/BarcodeEntry');
  }
}