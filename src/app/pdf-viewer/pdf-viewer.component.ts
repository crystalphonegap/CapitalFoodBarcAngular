import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer
  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getView();
    let count:number =parseInt( localStorage.getItem("Count"));
    if(count ==1){
      window.location.reload();
      localStorage.setItem("Count","2");
    }
    
  }
  getView(){
    const byteArray = new Uint8Array(atob(localStorage.getItem("Pdf")).split('').map(char => char.charCodeAt(0)));
    const url = window.URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
    // i.e. display the PDF content via iframe
    document.querySelector("iframe").src = url;
    this.changeDetection.detectChanges();
  }

  Download(){
    this.returnPdf(localStorage.getItem("Pdf"),"Demo");
  }


  returnPdf(base64String, fileName){
    if(window.navigator && window.navigator.msSaveOrOpenBlob){ 
      // download PDF in IE
      let byteChar = atob(base64String);
      let byteArray = new Array(byteChar.length);
      for(let i = 0; i < byteChar.length; i++){
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], {type : 'application/pdf'});
      window.navigator.msSaveOrOpenBlob(blob, `Invoice-${fileName}.pdf`);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:application/pdf;base64,${base64String}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `Test-${fileName}.pdf`
      link.click();
    }
  }

}
