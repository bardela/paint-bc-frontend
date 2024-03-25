import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-list-users",
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: "./list-users.component.html",
})
export class ListUsersComponent implements OnInit {
  users: User[] | undefined;
  canEdit: boolean = true;

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.users = await this.userService.getUsers();
    this.canEdit = true;
  }
}
