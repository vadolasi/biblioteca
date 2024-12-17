import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitoresComponent } from './leitores.component';

describe('LeitoresComponent', () => {
  let component: LeitoresComponent;
  let fixture: ComponentFixture<LeitoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeitoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeitoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
