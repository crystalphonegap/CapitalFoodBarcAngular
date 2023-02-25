import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCOdeComponent } from './qr-code.component';

describe('QrCOdeComponent', () => {
  let component: QrCOdeComponent;
  let fixture: ComponentFixture<QrCOdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCOdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCOdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
