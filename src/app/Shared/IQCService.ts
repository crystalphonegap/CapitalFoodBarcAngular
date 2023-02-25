import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class IQCService {
    constructor( private http: HttpClient) {
  
    }

    readonly BaseURI = environment.Web_API;

    GetIQCPendingList(PAGENUMBER,PAGESIZE,FROMDATE,TODATE) {
        //return this.http.get(this.BaseURI + '/IQC/GETIQCPENDINGLIST/',+PAGENUMBER+','+ PAGESIZE+) ;

        return this.http.get(this.BaseURI + '/IQC/GETIQCPENDINGLIST/' + PAGENUMBER+ ',' + PAGESIZE+','+FROMDATE+','+TODATE);
      }

      GETIQCDOCUMENTDETAILSBYID(DOCUMENTID) {
        return this.http.get(this.BaseURI + '/IQC/GETIQCDOCUMENTDETAILSBYID/' + DOCUMENTID);
      }

      DOCUMENTDEATISLINSERTUPDATE(Data) {
        debugger;
        return this.http.post(this.BaseURI + '/IQC/DOCUMENTDEATISLINSERTUPDATE', Data);
      }
}