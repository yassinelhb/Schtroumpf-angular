import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss'],
})
export class UpdateProfilComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() onChange = new EventEmitter<User>();
  @Output() close = new EventEmitter();

  userForm = this.fb.group({
    _id: [''],
    age: [''],
    race: [''],
    nourriture: [''],
    famille: [''],
  });

  @Input() set user(val: User) {
    if (val._id) this.userForm.patchValue(val);
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.updateProfile(this.userForm.value).subscribe((res) => {
      this.onChange.emit(res);
    });
  }

  onClose() {
    this.close.emit();
  }
}
