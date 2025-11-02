import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';
import { SecurityApi } from '../../services/security-api';
import { CartsApi } from '../../../carts/services/carts-api';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css', 
})
export class Login {
  private security = inject(SecurityApi);
  private carts = inject(CartsApi);               
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected user: AuthRequest = { email: '', password: '' };
  protected authResponse?: AuthResponse;
  protected authErrorMessage = '';
  private returnUrl: string | null = null;

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') ??
      this.route.snapshot.queryParamMap.get('returnurl');
  }

  protected onCredentialSubmit(): void {
    const email = this.user.email?.trim();
    const password = this.user.password?.trim();
    if (!email || !password) {
      this.showError('Please enter email and password.');
      return;
    }
    this.authErrorMessage = '';

    this.security.authenticateCredentials(this.user).subscribe({
      next: (res) => {
        this.authResponse = res;

        if (res?.token) {
         
          this.carts.reloadForCurrentUser();     

         
          if (this.returnUrl && this.returnUrl.length > 0) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.showError(res?.message || 'Invalid credentials.');
        }
      },
      error: (err) => this.showError(err?.message || 'Unable to login. Please try again.'),
    });
  }

  private showError(msg: string) {
    this.authErrorMessage = msg;
    setTimeout(() => (this.authErrorMessage = ''), 5000);
  }
}

