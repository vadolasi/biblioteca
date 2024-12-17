import { Component, OnInit } from '@angular/core';
import { faBook, faUser, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  faBook = faBook
  faUser = faUser
  faHandshake = faHandshake

  constructor(
    private backend: BackendService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    await this.backend.app.api.books.get()
    this.loading.loadingOff()
  }
}
