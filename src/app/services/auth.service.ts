import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { apiUrl } from 'config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

type TForm = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

  login(data: TForm) {
    return this.http
      .post<User>(`${apiUrl}api/auth/login`, data, httpOptions)
      .pipe(
        map((res: any) => {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        })
      );
  }

  register(data: TForm) {
    return this.http
      .post<User>(`${apiUrl}api/auth/register`, data, httpOptions)
      .pipe(
        map((res: any) => {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        })
      );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '');
  }

  logout() {
    this.http.get<any>(`${apiUrl}api/auth/logout`);
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem("currentUser");
    return authToken !== null ? true : false;
  }
}
