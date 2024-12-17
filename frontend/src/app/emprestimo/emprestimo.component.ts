import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.css'
})
export class EmprestimoComponent implements OnInit {
  faArrowLeft = faArrowLeft
  emprestimo: {
    book: {
      picture: string;
      title: string;
      author: string;
    }
    reader: {
      picture: string;
      name: string;
    }
    id: number;
    returnedDate: Date | null;
    estimatedReturnDate: Date;
    date: Date;
  } | null = null

  constructor(
    private backend: BackendService,
    private loading: LoadingService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { data } = await this.backend.app.api.loans.get()
    this.emprestimo = data?.[0] || null
    this.loading.loadingOff()
  }

  async devolver() {
    this.loading.loadingOn()
    await this.backend.app.api.loans({ id: this.emprestimo!.id }).return.post()
    this.loading.loadingOff()
    this.router.navigate(['/emprestimos'])
  }
}
