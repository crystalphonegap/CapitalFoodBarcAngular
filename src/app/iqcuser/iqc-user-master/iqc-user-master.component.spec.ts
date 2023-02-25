import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloCommonMasterComponent } from './solo-common-master.component';

describe('SoloCommonMasterComponent', () => {
  let component: SoloCommonMasterComponent;
  let fixture: ComponentFixture<SoloCommonMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloCommonMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloCommonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
