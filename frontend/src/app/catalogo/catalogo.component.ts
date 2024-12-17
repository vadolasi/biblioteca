import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  faArrowLeft = faArrowLeft
  livros: {
    title: string;
    author: string;
    id: number;
    picture: string;
    available: boolean;
  }[] = []

  constructor(
    private backend: BackendService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { data } = await this.backend.app.api.books.get()
    this.livros = data || []
    this.loading.loadingOff()
  }
}
