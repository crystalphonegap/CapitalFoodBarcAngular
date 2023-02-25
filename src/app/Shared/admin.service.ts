import { Injectable } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  readonly BaseURI = environment.Web_API;
 
 

}
