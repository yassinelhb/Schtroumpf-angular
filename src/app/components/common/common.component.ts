import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
})
export class CommonComponent implements OnInit {
  
  user: User = {
    _id: '',
    username: '',
    race: '',
    famille: '',
    nourriture: '',
    age: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userService
      .getUserProfile(this.authService.getCurrentUser())
      .subscribe((res) => {
        this.user = res;
      });
  }

  ngOnInit(): void {}

  onChange(user: User) {
    this.user = user;
  }

  onChangeFriends(friends: []) {
    this.user.friends = friends;
  }
}
