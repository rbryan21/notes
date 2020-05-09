import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotesNoteComponent } from './dashboard-notes-note.component';

describe('DashboardNotesNoteComponent', () => {
  let component: DashboardNotesNoteComponent;
  let fixture: ComponentFixture<DashboardNotesNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNotesNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNotesNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
