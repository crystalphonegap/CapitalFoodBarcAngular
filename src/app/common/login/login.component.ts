import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Shared/HomeService';
import { SoloCommonMasterComponent } from '../solo-Common-master/solo-Common-master.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _SoloCommonMasterComponent:SoloCommonMasterComponent,
    private _HomeService:HomeService, private changeDetection: ChangeDetectorRef,
    private router: Router,) { }

  FormData;
  ngOnInit(): void {
    this._SoloCommonMasterComponent.SetLogo(true);
    this.FormData = new FormGroup({
      UserCodetxt: new FormControl(''),
      Passwordvtxt: new FormControl('') 
    });
  }

  btnClick() {

    this._SoloCommonMasterComponent.setLoading(true);
    this._HomeService.Login( this.FormData.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/Admin');
       
     localStorage.removeItem('FromDate');
    localStorage.removeItem('ToDate');
        this._SoloCommonMasterComponent.setLoading(false);
        this.changeDetection.detectChanges();
      },
      err => {
        console.log(err);
        this._SoloCommonMasterComponent.setLoading(false);
      }
    );
};
}
