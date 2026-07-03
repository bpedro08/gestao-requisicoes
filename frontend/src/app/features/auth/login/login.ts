import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
  if (this.form.invalid) return;

  this.loading = true;
  this.error   = '';

      this.auth.login(this.form.value.email, this.form.value.password).subscribe({
        next: (response) => {
      console.log('Login response:', response);
      console.log('Token:', this.auth.getToken());
      console.log('User:', this.auth.currentUser());
      console.log('Navigating to /requests...');
      this.router.navigate(['/requests']).then(result => {
        console.log('Navigation result:', result);
      });
    },
    error: () => {
      this.error   = 'Invalid email or password';
      this.loading = false;
    }
  });
  }
}