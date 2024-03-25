import { Component, OnInit } from "@angular/core";
import { PaintService } from "../../services/paint.service";
import { Paint } from "../../models/paint";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-list-paints",
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: "./list-paints.component.html",
})
export class ListPaintsComponent implements OnInit {
  paints: Paint[] | undefined;
  constructor(private paintService: PaintService,
              readonly authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.paints = await this.paintService.getPaints();
  }
}
