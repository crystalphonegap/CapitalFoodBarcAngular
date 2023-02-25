import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solo-admin-master',
  templateUrl: './solo-admin-master.component.html',
  styleUrls: ['../../app.component.scss'],
  
})
export class SoloAdminMasterComponent implements OnInit {

  constructor( private changeDetection: ChangeDetectorRef ,private router: Router) { }
  loading='none';
  Title:string="Default" ;
  ngOnInit(): void {
    if(  localStorage.getItem('UserCode')===null ||  localStorage.getItem('UserCode')===''||
    localStorage.getItem('UserType')===null ||  localStorage.getItem('UserType')===''){
        this.router.navigateByUrl('/Login');
    }
    (document.querySelector('.SoloLoader') as HTMLElement).style.display = 'none';
     this.Title=localStorage.getItem('PageTitle');
  }

  public SetTitle(newTitle:string){
    this.Title=newTitle;
    this.changeDetection.detectChanges();
  }

  Logout(){
    localStorage.removeItem('UserCode');
    localStorage.removeItem('UserType');
    localStorage.removeItem('UserName');
    localStorage.removeItem('ID');
    this.router.navigateByUrl('/Login');
  }
  public setLoading(value :boolean){
    if(value==true){
      this.loading='block';
    }else{
      this.loading='none';
    }
    (document.querySelector('.SoloLoader') as HTMLElement).style.display = this.loading;
  }
}
