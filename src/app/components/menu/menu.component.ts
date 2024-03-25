import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css"
})
export class MenuComponent implements OnInit {
  currentUser: User;
  constructor(readonly authService: AuthService) {
  }

  ngOnInit() {
    this.authService.whoAmI()
      .subscribe(user => this.currentUser = user);
  }
}
