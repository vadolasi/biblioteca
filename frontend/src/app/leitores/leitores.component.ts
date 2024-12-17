import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leitores',
  templateUrl: './leitores.component.html',
  styleUrl: './leitores.component.css'
})
export class LeitoresComponent implements OnInit {
  faArrowLeft = faArrowLeft

  leitores: {
    name: string;
    id: number;
    picture: string;
  }[] = []

  constructor(
    private backend: BackendService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { data } = await this.backend.app.api.readers.get()
    this.leitores = data || []
    this.loading.loadingOff()
  }
}
