import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private router: Router,
    private title: Title,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.title.setTitle('Login | ReqManager');
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    this.auth.login(this.form.value.email, this.form.value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/requests']).then((result) => {
          console.log('Navigation result:', result);
        });
      },
      error: () => {
        this.error = 'Invalid email or password';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
