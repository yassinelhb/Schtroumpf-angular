import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() user: any;
  @Output() onChangeFriends = new EventEmitter<[]>();
  addUser: boolean = false;
  users: User[] = [];
  loading: boolean = false;
  followLoading: number = -1;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe((res) => {
      if (res) {
        this.users = res.filter(
          (user) => user._id !== this.authService.getCurrentUser()
        );
        this.loading = false;
      }
    });
  }

  followClick(userId: string, index: number) {
    this.followLoading = index;
    this.userService.follow(userId).subscribe((res) => {
      this.onChangeFriends.emit(res.friends);

      this.followLoading = -1;
    });
  }

  unFollowClick(userId: string, index: number) {
    this.followLoading = index;
    this.userService.unFollow(userId).subscribe((res) => {
      this.onChangeFriends.emit(res.friends);

      this.followLoading = -1;
    });
  }

  isFollow(userId: string) {
    return this.user.friends.some((friendId: string) => friendId === userId);
  }

  AddFriend() {
    this.addUser = true;
  }

  onClose(user?: any) {
    this.addUser = false;
    this.users.push(user);
  }
}
