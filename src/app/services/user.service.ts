import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { apiUrl } from 'config';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = this.authService.getCurrentUser();
  constructor(
    private http: HttpClient,
    public router: Router,
    public authService: AuthService
  ) {}

  getUsers() {
    return this.http.get<User[]>(`${apiUrl}api/users`, httpOptions);
  }

  getUserProfile(userId: string) {
    return this.http.get<User>(`${apiUrl}api/users/${userId}`, httpOptions);
  }

  updateProfile(user: User) {
    return this.http.put<User>(
      `${apiUrl}api/users/${user._id}`,
      user,
      httpOptions
    );
  }

  follow(friendId: string) {
    return this.http.put<User>(
      `${apiUrl}api/users/follow/${this.currentUser}`,
      { friendId },
      httpOptions
    );
  }

  unFollow(friendId: string) {
    return this.http.put<User>(
      `${apiUrl}api/users/unfollow/${this.currentUser}`,
      { friendId },
      httpOptions
    );
  }
}
