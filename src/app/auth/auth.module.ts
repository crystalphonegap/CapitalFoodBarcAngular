import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMasterComponent } from './auth-master/auth-master.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../modules/vocabs/translation.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [AuthMasterComponent],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
