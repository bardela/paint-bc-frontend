import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  users: User[];
  authForm: FormGroup;
  currentUser: User;
  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.authService.whoAmI()
      .subscribe(user => this.currentUser = user);

    this.userService.getUsers().then(users => {
      this.users = users;
    });
    this.authForm = this.formBuilder.group({
      userId: Number,
    });
  }

  onSubmit(): void {
    const userId = this.authForm.value.userId;
    const user = this.users.find(user => user.id === userId);
    this.authService.logInAs(user!!);
  }

  displayUser(user: User): string {
    return `${ user.name } ( ${user.role} )`;
  }
}
