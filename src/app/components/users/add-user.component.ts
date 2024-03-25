import { Component, OnInit } from "@angular/core";
import { EditUserComponent } from "./edit-user.component";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [
    EditUserComponent
  ],
  templateUrl: "./add-user.component.html",
})
export class AddUserComponent implements OnInit {
  ngOnInit() {
  }
}
