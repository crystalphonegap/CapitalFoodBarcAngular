import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeEntryComponent } from './barcode-entry.component';

describe('BarcodeEntryComponent', () => {
  let component: BarcodeEntryComponent;
  let fixture: ComponentFixture<BarcodeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
