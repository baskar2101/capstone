import { Component } from '@angular/core';
import { AuthService, LoginResponse } from '../services/auth.service'; // Adjust this path based on the structure
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed', err);
      },
    });
  }
}
