import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  @Input() open: boolean = false;
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter<User>();
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.registerForm.controls;
  }

  onClose() {
    this.closeEmitter.emit();
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.userService.create(this.registerForm.value).subscribe(
      (res) => {
       this.closeEmitter.emit(res);
      },
      (err) => {
        this.errorMessage = err.error.errors;
      }
    );
  }
}
