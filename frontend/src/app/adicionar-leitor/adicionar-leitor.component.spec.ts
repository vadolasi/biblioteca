import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarLeitorComponent } from './adicionar-leitor.component';

describe('AdicionarLeitorComponent', () => {
  let component: AdicionarLeitorComponent;
  let fixture: ComponentFixture<AdicionarLeitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarLeitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarLeitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
