import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';
import { LoadingService } from '../loading.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leitor',
  templateUrl: './leitor.component.html',
  styleUrl: './leitor.component.css'
})
export class LeitorComponent implements OnInit {
  faArrowLeft = faArrowLeft
  leitor: {
    name: string;
    picture: string;
    id: number;
  } | null = null

  constructor(
    private backend: BackendService,
    private loading: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading.loadingOn()
    const { id } = this.route.snapshot.params
    const { data } = await this.backend.app.api.readers.get(id)
    this.leitor = data?.[0] || null
    this.loading.loadingOff()
  }

  async onDelete() {
    if (this.leitor) {
      this.loading.loadingOn()
      await this.backend.app.api.readers({ id: this.leitor.id }).delete()
      this.loading.loadingOff()
      await this.router.navigate(['/leitores'])
    }
  }
}
