import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotesHomeComponent } from './dashboard-notes-home.component';

describe('DashboardNotesHomeComponent', () => {
  let component: DashboardNotesHomeComponent;
  let fixture: ComponentFixture<DashboardNotesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNotesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNotesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
