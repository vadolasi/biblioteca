import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-emprestimo',
  templateUrl: './adicionar-emprestimo.component.html',
  styleUrl: './adicionar-emprestimo.component.css'
})
export class AdicionarEmprestimoComponent {
  faArrowLeft = faArrowLeft
  form = new FormGroup({
    readerId: new FormControl('', [Validators.required]),
    bookId: new FormControl('', [Validators.required]),
    estimatedReturnDate: new FormControl('', [Validators.required])
  })
  tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  constructor(
    private backend: BackendService,
    private router: Router
  ) {}

  async onSubmit() {
    const { readerId, bookId, estimatedReturnDate } = this.form.value
    await this.backend.app.api.loans.post({ readerId: parseInt(readerId!), bookId: parseInt(bookId!), estimatedReturnDate: new Date(estimatedReturnDate!).getTime() })
    this.router.navigate(['/emprestimos'])
  }
}
