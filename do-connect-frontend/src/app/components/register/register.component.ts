// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    const userData = { name: this.name, email: this.email, password: this.password, role: this.role };
    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert(err.error.msg || 'Registration failed');
      }
    });
  }
}
