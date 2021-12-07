import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn &&
      this.authService.checkJwt().subscribe(
        (res) => {
          localStorage.setItem('currentUser', JSON.stringify(res));
        },
        (err) => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      );
  }
}
