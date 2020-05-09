import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTopNavbarComponent } from './notes-top-navbar.component';

describe('NotesTopNavbarComponent', () => {
  let component: NotesTopNavbarComponent;
  let fixture: ComponentFixture<NotesTopNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesTopNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
