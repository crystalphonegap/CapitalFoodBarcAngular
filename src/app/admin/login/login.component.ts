import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Shared/HomeService';
import { SoloAdminMasterComponent } from '../solo-admin-master/solo-admin-master.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _SoloCommonMasterComponent:SoloAdminMasterComponent,private _HomeService:HomeService, private changeDetection: ChangeDetectorRef,private router: Router,) { }

  FormData;
  ngOnInit(): void {
    this.FormData = new FormGroup({
      UserCodetxt: new FormControl(''),
      Passwordvtxt: new FormControl('') 
    });
  }

  btnClick() {

    this.router.navigateByUrl('/Admin/PartyList');
    // this._SoloCommonMasterComponent.setLoading(true);
    // this._HomeService.Login( this.FormData.value).subscribe(
    //   (res: any) => {
    //     this.router.navigateByUrl('/Admin');
       
    //     this._SoloCommonMasterComponent.setLoading(false);
    //     this.changeDetection.detectChanges();
    //   },
    //   err => {
    //     console.log(err);
    //     this._SoloCommonMasterComponent.setLoading(false);
    //   }
    // );
}
}
