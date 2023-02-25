import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  @ViewChildren('input') inputs: QueryList<ElementRef>;
  constructor(private renderer: Renderer2) { }
  CurrentIndex = 0;
  TestData: any = [];
  ngOnInit(): void {
    this.TestData.push({ QRCode: '' });
    this.TestData.push({ QRCode: '' });
  }
  SetCurrentIndex(i) {
    this.CurrentIndex = i;
  }

  onDataChange() {
    // for (let i: number = 0; i < this.TestData.length; i++) {
    //   if ( this.TestData[i].QRCode == '' ||   this.TestData[i].QRCode==null) {
    //   } 
    // }

  }

  ngAfterViewInit() {
    const element = this.renderer.selectRootElement('#input0');
    setTimeout(() => element.focus(), 0);
  }

  ValueChanged(Value, Index) {
    this.TestData[Index].QRCode = Value;
    if (this.TestData[this.TestData.length - 2].QRCode != '' && this.TestData[this.TestData.length - 2].QRCode != null) {
      this.TestData.push({ QRCode: '' });
      let count = Index + 1;
      var  selectedelement ='#input'+count.toString();
      const element = this.renderer.selectRootElement(selectedelement);
      setTimeout(() => element.focus(), 0); 
    }

  }
}