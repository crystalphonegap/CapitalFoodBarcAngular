import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor( private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
  InsertBarCode(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Home/InsertBarCode', Data);
  }
  InsertBarCodeByBarcode(Data): Observable<any> {
    return this.http.post(this.BaseURI + '/Home/InsertBarCodeByBarcode', Data);
  }

  Login(Model) {
    return this.http.post(this.BaseURI + '/Home/Login',Model) ;
  } 
  GetItemList(Model) {
    return this.http.post(this.BaseURI + '/Home/GetItemList',Model) ;
  } 
  GetQrCodeList(Model) {
    return this.http.post(this.BaseURI + '/Home/GetQrCodeList',Model) ;
  } 
  DeleteQrCode(Model) {
    return this.http.post(this.BaseURI + '/Home/DeleteQrCode',Model) ;
  } 
  GetPartyList(Model) {
    return this.http.post(this.BaseURI + '/Home/GetPartyList',Model) ;
  } 
  GetTestMasterByCollectionCenterID(CenterID,Type,Keyword) {
    if(Keyword==''||Keyword==null){
      Keyword="NoSearch";
    }
    return this.http.get(this.BaseURI + '/Home/GetTestMasterByCollectionCenterID/'+CenterID+','+Type+','+Keyword);
  }
}
