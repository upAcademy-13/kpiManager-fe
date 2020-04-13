import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaoSemanalComponent } from './conversao-semanal.component';

describe('ConversaoSemanalComponent', () => {
  let component: ConversaoSemanalComponent;
  let fixture: ComponentFixture<ConversaoSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversaoSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversaoSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
