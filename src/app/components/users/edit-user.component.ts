import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { lastValueFrom } from "rxjs";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: "app-edit-user",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./edit-user.component.html",
})
export class EditUserComponent implements OnInit {
  user: User;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  userForm: FormGroup;
  roles = [ "admin", "manager", "painter", "viewer" ];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    this.initUserForm();
    const userId = this.route.snapshot.paramMap.get("id");
    if (userId && !isNaN(Number(userId))) {
      this.user = await this.userService.getUser(Number(userId));
      this.initUserForm();
    }
  }

  initUserForm(): void {
    this.userForm = this.formBuilder.group({
      name: this.user?.name,
      age: this.user?.age,
      role: this.user?.role,
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const userUpdated = this.user?.id ? await this.editUser() : await this.addUser();
      if (!userUpdated) {
        throw new Error();
      }
      this.userForm.reset();
      this.successMessage = "Succeed!";
    } catch (error) {
      this.errorMessage = "Failed! " + this.errorMessage;
    }
  }

  async addUser(): Promise<User> {
    const user$ = await this.userService.addUser(
      this.userForm.value.name,
      this.userForm.value.age,
      this.userForm.value.role,
    );
    return await lastValueFrom(user$);
  }

  async editUser(): Promise<User> {
    const user$ = await this.userService.editUser(
      this.user.id,
      this.userForm.value.name,
      this.userForm.value.age,
      this.userForm.value.role,
    );
    return await lastValueFrom(user$);
  }
}
