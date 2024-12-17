import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-adicionar-leitor',
  templateUrl: './adicionar-leitor.component.html',
  styleUrl: './adicionar-leitor.component.css'
})
export class AdicionarLeitorComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required])
  })

  faArrowLeft = faArrowLeft

  alert = ''

  constructor(
    private router: Router,
    private backend: BackendService
  ) {}

  async onSubmit() {
    console.log('onSubmit')
    const { name, picture } = this.form.value as { name: string, picture: string }

    const { data } = await this.backend.app.api.readers.post({ name, picture })

    if (data?.error) {
      this.alert = data.error
    } else {
      await this.router.navigate(['/leitores'])
    }
  }
}
