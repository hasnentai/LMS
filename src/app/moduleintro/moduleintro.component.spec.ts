import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleintroComponent } from './moduleintro.component';

describe('ModuleintroComponent', () => {
  let component: ModuleintroComponent;
  let fixture: ComponentFixture<ModuleintroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleintroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleintroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
