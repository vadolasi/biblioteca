import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEmprestimoComponent } from './adicionar-emprestimo.component';

describe('AdicionarEmprestimoComponent', () => {
  let component: AdicionarEmprestimoComponent;
  let fixture: ComponentFixture<AdicionarEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarEmprestimoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
