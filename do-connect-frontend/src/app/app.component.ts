// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Your existing properties and methods

  logout() {
    // Logic for logout
    console.log('User logged out');
    // Implement your logout functionality (like clearing tokens, etc.)
  }
}
