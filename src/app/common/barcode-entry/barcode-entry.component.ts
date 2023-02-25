import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { count, map, startWith } from 'rxjs/operators';
import { HomeService } from 'src/app/Shared/HomeService';
import { BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamOverlayComponent } from "ngx-barcode-scanner";
import { SoloCommonMasterComponent } from '../solo-Common-master/solo-Common-master.component';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { iif, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {Howl, Howler} from 'howler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barcode-entry',
  templateUrl: './barcode-entry.component.html',
  styleUrls: ['./barcode-entry.component.scss']
})
export class BarcodeEntryComponent implements OnInit {

  @ViewChild(BarcodeScannerLivestreamOverlayComponent)
  barcodeScannerOverlay: BarcodeScannerLivestreamOverlayComponent;


  @ViewChildren('input') inputs: QueryList<ElementRef>;
  constructor(private changeDetection: ChangeDetectorRef, public toastr: ToastrService,
    private _HomeService:HomeService,private  _SoloCommonMasterComponent:SoloCommonMasterComponent,
     private router: Router,private alertService: AlertService,
      @Inject(SESSION_STORAGE) private storage: WebStorageService, private renderer: Renderer2) { }
  CurrentIndex = 0; 
  ItemCode: string;
  Items;
  Tempitem:any;
  Message;
  errorSound = new Howl({
    src: ['/assets/sound/error.mp3']
  });
  SuccessSound = new Howl({
    src: ['/assets/sound/success.mp3']
  });
  ProductDescription: string;
  BalanceQuantity: string;
  ScannedCount=0;
  AutoBarcodeEntery=true;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  PartyName:string='';
  DC:string='';
  Date:string='';
 EnableItemSelection=false;
 DataList;
 AutoScanForSameIte=false;
  barcodeValue;
  ProQTY;
  ngOnInit(): void {
    this.getAllData();
    this._SoloCommonMasterComponent.SetLogo(false); 
    this.PartyName=localStorage.getItem('PartyName');
    this.DC=localStorage.getItem('DC');
    this.Date =localStorage.getItem('Date');
    this.ItemCode = localStorage.getItem('ItemCode');
    this.ProductDescription = localStorage.getItem('ProductDescription');
    this.BalanceQuantity = localStorage.getItem('BALQTY');
    this.ProQTY = localStorage.getItem('ProQTY');
    let BalanceQuantity= parseInt(  localStorage.getItem('ProQTY')) 
  }

  ChangeVisiblety(ID,mode){
    this.DataList[ID].visible =mode;
  }
  Edit(ItemCode,ProductDescription,BALQTY,ProQTY){
    localStorage.setItem('ItemCode',ItemCode);
    localStorage.setItem('ProductDescription',ProductDescription);
    localStorage.setItem('BALQTY',BALQTY);  
    localStorage.setItem('ProQTY',ProQTY);  
    this.router.navigateByUrl('/User/QRCodeScan');
  }
  BarCodestart(){
    this.barcodeScannerOverlay.show();
  }
  onValueChanges(result,i) {
    this.barcodeValue = result.codeResult.code;
    console.log( this.barcodeValue)
    this.BlurChanged(this.barcodeValue);
    this.OnEnterChanged(this.barcodeValue);
  }
 
  onStarted(event: boolean): void {
    console.log('started', event);
}

  History(){
    
    this.router.navigateByUrl('/User/ItemList');
  }

InsertBarCode(Barcode,SerialId) { 
  this.alertService.clear(); 
  this.EnableItemSelection=false;
  if(this.barcodeValue!==''&&this.barcodeValue!==null&&this.barcodeValue!==undefined){
    this.barcodeValue=this.barcodeValue.replace('|', '')
    if(this.barcodeValue.length>20){
      this.barcodeValue='';
      this.toastr.warning('Barcode length limit  exceed!');
      return;
    }
    let model ={ 
      CardName:localStorage.getItem('PartyName'),
      SeriesName:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'), 
      DocDate:localStorage.getItem('Date'), 
      Barcode:this.barcodeValue,
    }
    this._SoloCommonMasterComponent.setLoading(true);
    this._HomeService.InsertBarCodeByBarcode(model).subscribe((res: any) => {  
      // this._SoloCommonMasterComponent.setLoading(false);  
          this._SoloCommonMasterComponent.setLoading(false);
      if(res!==null){  
        this.changeDetection.detectChanges();
        if(res.data=='Barcode already exist for total quantuty'){
          this.toastr.warning('All Barcode already exist for this item');
          this.Message='All Barcode already exist for this item';
          this._SoloCommonMasterComponent.setLoading(false);
          this.alertService.warn('All Barcode already exist for this item');
          this.errorSound.play();
          this.changeDetection.detectChanges();
          return;
        }else if(res.data=='Barcode Already Exist'){
          this.toastr.warning('Barcode already exist');
          this.Message='Barcode already exist';
          this.alertService.warn('Barcode already exist');
          this.errorSound.play();
          this.changeDetection.detectChanges();
          this._SoloCommonMasterComponent.setLoading(false);
          return;
        }else if(res.data=='No item available for entered barcode'){
        
          this.errorSound
          this.Message='No item available for entered barcode Please select item';
          this.toastr.warning('No item available for entered barcode Please select item');
          this.alertService.warn('No item available for entered barcode Please select item'); 
          this.EnableItemSelection=true; 
          this.errorSound.play();
          this._SoloCommonMasterComponent.setLoading(false);
          this.changeDetection.detectChanges();
          return;
        }else{
          if(res.data.indexOf('Barcode Already Exist') !== -1){

            this.toastr.error(res.data);
            this.Message=res.data ;
            this.alertService.error(res.data);
            this.barcodeValue='';  
            this.changeDetection.detectChanges(); 
            this.errorSound.play();
            return;
          }else{
            
          this.toastr.success(res.data);
          this.Message=res.data ;
          this.alertService.success(res.data);
          this.barcodeValue='';  
          this.changeDetection.detectChanges(); 
          this.SuccessSound.play();
          this.getAllData();
          return;
          }
        }
      } 
      this.selectBarcodeTextBoox();
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
      this.selectBarcodeTextBoox();
      this.alertService.error( 'Following error occurred ' +err.ModelState.message[0]);
      this.errorSound.play();
        console.log(err);
    });  
  }
  }   
  
StartAutoScanAndInsertBarcode(){
  this.alertService.clear();  


  
  try {
    let tempText='';
    if(this.Tempitem !=null){
      tempText=this.Tempitem.ItemCode+'-'+this.Tempitem.Description;
    }
   this.Tempitem = this.Items.find(x=>x.ItemCode+'-'+x.Description ==this.myControl.value ||x.ItemCode+'-'+x.Description ==tempText) 
  } catch (error) {
    console.log(error);
    return;
  }
  // try {
  //  this.Tempitem = this.Items.find(x=>x.ItemCode+'-'+x.Description ==this.myControl.value ||x.ItemCode+'-'+x.Description ==this.Tempitem.ItemCode+'-'+this.Tempitem.Description) 
  // } catch (error) {
  //   console.log(error);
  //   this.alertService.error(error);
  //   return;
  // }
  if(this.Tempitem ===null || this.Tempitem===undefined ){
    this.alertService.error('Please Select Item');
    this.errorSound.play();
    return;
  }else{

    this.AutoScanForSameIte=true;
    this.InsertBarCodeByItem();
  }
}

StopAutoScanForSameItem(){
  this.alertService.clear();  
  this.Tempitem=null;
  this.AutoScanForSameIte=false; 
}

InsertBarCodeByItem( ) {  
  this.alertService.clear();  

  try {
    let tempText='';
    if(this.Tempitem !=null){
      tempText=this.Tempitem.ItemCode+'-'+this.Tempitem.Description;
    }
  
   this.Tempitem = this.Items.find(x=>x.ItemCode+'-'+x.Description ==this.myControl.value ||x.ItemCode+'-'+x.Description ==tempText) 
  } catch (error) {
    console.log(error);
    return;
  }
  if(this.Tempitem ===null || this.Tempitem===undefined ){
    this.alertService.error('Please Select Item');
    this.errorSound.play();
    return;
  }
  this.barcodeValue=this.barcodeValue.replace('|', '')
  if(this.barcodeValue.length>20){
    this.barcodeValue='';
    this.toastr.warning('Barcode length limit  exceed!');
    return;
  }
  let model ={ 
    CardName:localStorage.getItem('PartyName'),
    SeriesName:localStorage.getItem('DC'),
    UserCode:localStorage.getItem('UserCode'),
    ItemCode:this.Tempitem.ItemCode,
    DocDate:localStorage.getItem('Date'),
    Dscription:this.Tempitem.Description,
    QTY:this.Tempitem.inwoard,  
    Barcode:this.barcodeValue,
  }
  this._SoloCommonMasterComponent.setLoading(true);
  this._HomeService.InsertBarCode(model).subscribe((res: any) => {   
    this._SoloCommonMasterComponent.setLoading(false);
    if(res!==null){ 
      if(res.data.indexOf('Barcode Already Exist') !== -1){

        this.toastr.error(res.data);
        this.Message=res.data ;
        this.alertService.error(res.data);
        this.barcodeValue='';  
        this.changeDetection.detectChanges(); 
        this.errorSound.play();
        return;
      }
      else{
        this.alertService.success(res.data);
        this.toastr.success(res.data); 
        this.Items=null;
        this.myControl= new FormControl(null);
        this.EnableItemSelection=false
        this.changeDetection.detectChanges();
        this.barcodeValue='';   
        this.SuccessSound.play(); 
        this.getAllData();
        this.Message=res.data;
        this.alertService.success(res.data);
      }
     
    }
    this.changeDetection.detectChanges();
    this.selectBarcodeTextBoox();
  },
  err => { 
    this._SoloCommonMasterComponent.setLoading(false);
    this.changeDetection.detectChanges();
    this.errorSound.play();
    this.alertService.error( 'Following error occurred ' +err.ModelState.message[0]);
      console.log(err);
  });  
}   
      

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Items.filter(option => option.ItemCode.toLowerCase().includes(filterValue) ||   option.Description.toLowerCase().includes(filterValue) );
  }

  onDataChange() {
    // for (let i: number = 0; i < this.TestData.length; i++) {
    //   if ( this.TestData[i].Barcode == '' ||   this.TestData[i].Barcode==null) {
    //   } 
    // }

  }

  ngAfterViewInit() { 
  this.alertService.clear();
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0); 
  }
 
  selectBarcodeTextBoox(){
   const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0); 
  }

  OnEnterChanged(Value) {
    this.alertService.clear();
    this.BlurChanged(Value);
  }
 
  OnInput(Value){
    if( this.AutoScanForSameIte){
      if(Value.length>=15 &&   this.AutoBarcodeEntery){
        this.alertService.clear();
        this.InsertBarCodeByItem();
      }
    }else if(this.AutoBarcodeEntery) {
      if(Value.length>=15 ){
        this.alertService.clear();
        this.BlurChanged(Value);
      }
    }
  }

  BlurChanged(Value) {
    this.alertService.clear();
  //  let Tempfind = this.TestData.find(x=>x.Barcode == Value);
   if(Value!==''&&Value!==null){
      Value=Value.replace('|', '')
      this.InsertBarCode(Value,this.barcodeValue);
      this.changeDetection.detectChanges(); 
    // }
    
    // else{
    //   this.TestData[Index].Barcode = '';
    //   this.alertService.warn("Barcode Already Exist");
    //   this.changeDetection.detectChanges();
    // }
   }
    
  }
 

  Delete() {
    this.alertService.clear();
    this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      CardName:localStorage.getItem('PartyName'),
      SeriesName:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'), 
      DocDate:localStorage.getItem('Date'), 
      Barcode:this.barcodeValue ,
    }
    this.barcodeValue= '';  
    var selectedelement = '#input1' ;
    const element = this.renderer.selectRootElement(selectedelement);
    setTimeout(() => element.focus(), 0); 
    this._HomeService.DeleteQrCode(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false);  
        this.alertService.success(res.data); 
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
    this.alertService.clear();
    this.router.navigateByUrl('/User/PartyList');
  }


  getAllData() { 
    // this._SoloCommonMasterComponent.setLoading(true);
    let model ={ 
      PartyName:localStorage.getItem('PartyName'),
      DC:localStorage.getItem('DC'),
      UserCode:localStorage.getItem('UserCode'),
    }
    this._HomeService.GetItemList(model).subscribe((res: any) => {  
      this._SoloCommonMasterComponent.setLoading(false); 
      this.DataList = res;  
      if( this.AutoScanForSameIte){
        for(let count: number =0;count <this.DataList.length;count++){
          let temp =this.DataList[count].ItemCode+'-'+this.DataList[count].Description
          if(temp  ==this.Tempitem.ItemCode+'-'+this.Tempitem.Description){
            if(this.DataList[count].BALQTY<1){
              this.StopAutoScanForSameItem();
            }
           
          }
        } 
      }
      this.changeDetection.detectChanges();
       this.Items = res.filter(option => option.BALQTY >0);  
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.changeDetection.detectChanges();
    },
    err => { 
      this._SoloCommonMasterComponent.setLoading(false);
      this.changeDetection.detectChanges();
        console.log(err);
    });  
  } 

}