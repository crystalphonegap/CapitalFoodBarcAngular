import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { HomeService } from 'src/app/Shared/HomeService';
import { AlertService } from 'src/app/CustomComponents/alert.service';
import { PwaService } from 'src/app/Shared/pwa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public Pwa: PwaService,private _HomeService:HomeService,private alertService: AlertService, private changeDetection: ChangeDetectorRef,private router: Router,) { }

  FormData ;
  ngOnInit(): void {
    if(  localStorage.getItem('UserCode')!==null &&  localStorage.getItem('UserCode')!==''){
      if( localStorage.getItem('UserType')==='Admin'){
        this.router.navigateByUrl('/Admin');
      }
      if( localStorage.getItem('UserType')==='User'){
        this.router.navigateByUrl('/User');
      }
    }
    this.FormData = new FormGroup({
      UserCode: new FormControl(''),
      Password: new FormControl('') 
    });
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
  btnClick() {

    // this._SoloCommonMasterComponent.setLoading(true);
    this._HomeService.Login( this.FormData.value).subscribe(
      (res: any) => {
        if(res.length!==0){
          localStorage.setItem('UserCode',res[0].UserCode);
          localStorage.setItem('UserName',res[0].UserName);
          localStorage.setItem('UserType',res[0].UserType);
          localStorage.setItem('ID',res['ID']);
          if(res[0].UserType==='Admin'){
            this.router.navigateByUrl('/Admin');
          }
          if(res[0].UserType==='User'){
            this.router.navigateByUrl('/User');
          }
          if(res[0].UserType==='IQC'){
            this.router.navigateByUrl('/IQC');
          }
        }else{
            this.alertService.error('Invalid User Name or password');
        }
        
        // this._SoloCommonMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        // this._SoloCommonMasterComponent.setLoading(false);
      }
    );
}
}

