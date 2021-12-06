import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  @Input() user: User = {
    _id: '',
    username: '',
    race: '',
    famille: '',
    nourriture: '',
    age: '',
  };
  @Output() changeUser = new EventEmitter<User>();
  updateProfile: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onChange(user: User) {
    this.changeUser.emit(user);
    this.updateProfile = false;
  }

  onUpdateClose() {
    this.updateProfile = false;
  }

  logout() {
    this.authService.logout();
  }
}
