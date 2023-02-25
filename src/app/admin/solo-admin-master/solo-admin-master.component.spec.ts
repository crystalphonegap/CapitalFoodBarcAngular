import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloAdminMasterComponent } from './solo-admin-master.component';

describe('SoloAdminMasterComponent', () => {
  let component: SoloAdminMasterComponent;
  let fixture: ComponentFixture<SoloAdminMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloAdminMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloAdminMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
