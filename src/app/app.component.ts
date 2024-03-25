import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MenuComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Paint BC";
}
