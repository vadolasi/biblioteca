import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  alert = '';

  constructor(
    private router: Router,
    private backend: BackendService
  ) {}

  async onSubmit() {
    const { email, password } = this.form.value as { email: string, password: string }

    const { data } = await this.backend.app.api.login.post({ email, password })

    if (data?.error) {
      this.alert = data.error
    } else {
      await this.router.navigate(['/'])
    }
  }
}
