import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import jwt_decode from 'jwt-decode';  // Correct import

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        this.user = jwt_decode(token);  // Correct function usage
        console.log("Decoded Token:", this.user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found");
    }
  }
}
