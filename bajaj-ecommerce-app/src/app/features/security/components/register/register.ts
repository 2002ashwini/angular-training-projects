import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bajaj-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user = { name: '', email: '', password: '' };
  authErrorMessage = '';
  loading = false;

  private baseUrl = `http://localhost:9090`;

  constructor(private http: HttpClient, private router: Router) { }

  onRegisterSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.authErrorMessage = '';

    this.http.post(`${this.baseUrl}/api/auth/register`, this.user)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          localStorage.setItem('auth_token', res.token);
          alert('Registration successful!');
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          this.loading = false;
          this.authErrorMessage =
            err.error?.error || 'Registration failed. Try again.';
        }
      });
  }
}
