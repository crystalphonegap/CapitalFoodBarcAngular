import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-no-wise-entry',
  templateUrl: './document-no-wise-entry.component.html',
  styleUrls: ['./document-no-wise-entry.component.scss']
})
export class DocumentNoWiseEntryComponent implements OnInit {

  constructor( private router: Router,) { }
  CurrentIndex = 0;
  DataList: any = [];
  Status: string='0';
  DocNum: string='9';
  GRNNo: string='GR 2122/651';
  GRNDate='25/10/2021';
  CardCode:string='VA0832';
  CardName:string='A.R.Enterprises';
  ItemCode:string='SIAMPPAS009';
  ItemName:string='DPA 45000 - AMP Module w/o ';
  IQCQTY:string='10';
  CompleteQTY:string='0';
  Remark:string='Auto IQC Draft';
  Date:string='';
  ScannedCount=0; 
 
 
  barcodeValue;
  ProQTY;
  ngOnInit(): void {
    this.DataList=[
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },
      {
        ItemCode:'SIAMPPAS009',
        Barcode:'',
      },

    ]
  }

  Back() {
    this.router.navigateByUrl('/IQC/PartyList');
  }
}
