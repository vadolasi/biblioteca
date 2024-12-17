import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.css'
})
export class EmprestimosComponent implements OnInit {
  faArrowLeft = faArrowLeft
  today = new Date()

  emprestimos: {
    book: {
      title: string;
    }
    reader: {
      name: string;
    }
    id: number;
    returnedDate: Date | null;
    estimatedReturnDate: Date;
    date: Date;
  }[] = []

  constructor(
    private backend: BackendService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { data } = await this.backend.app.api.loans.get()
    this.emprestimos = data || []
    this.loading.loadingOff()
  }
}
