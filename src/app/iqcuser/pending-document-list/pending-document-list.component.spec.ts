import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDocumentListComponent } from './pending-document-list.component';

describe('PendingDocumentListComponent', () => {
  let component: PendingDocumentListComponent;
  let fixture: ComponentFixture<PendingDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDocumentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
