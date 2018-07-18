import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinfoComponent } from './editinfo.component';

describe('EditinfoComponent', () => {
  let component: EditinfoComponent;
  let fixture: ComponentFixture<EditinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
