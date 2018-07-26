import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubblegameComponent } from './bubblegame.component';

describe('BubblegameComponent', () => {
  let component: BubblegameComponent;
  let fixture: ComponentFixture<BubblegameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubblegameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubblegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
