import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavBarComponent } from './layout-nav-bar.component';

describe('LayoutNavBarComponent', () => {
  let component: LayoutNavBarComponent;
  let fixture: ComponentFixture<LayoutNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
