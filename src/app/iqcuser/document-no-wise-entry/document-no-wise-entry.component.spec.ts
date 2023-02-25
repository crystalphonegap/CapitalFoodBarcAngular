import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNoWiseEntryComponent } from './document-no-wise-entry.component';

describe('DocumentNoWiseEntryComponent', () => {
  let component: DocumentNoWiseEntryComponent;
  let fixture: ComponentFixture<DocumentNoWiseEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentNoWiseEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentNoWiseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
