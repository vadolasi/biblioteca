import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent implements OnInit {
  faArrowLeft = faArrowLeft
  livro: {
    title: string;
    picture: string;
    author: string;
    id: number;
    available: boolean;
  } | null = null

  constructor(
    private backend: BackendService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { data } = await this.backend.app.api.books.get()
    this.livro = data?.[0] || null
    this.loading.loadingOff()
  }
}
