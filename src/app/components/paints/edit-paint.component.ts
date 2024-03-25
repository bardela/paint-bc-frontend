import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PaintService } from "../../services/paint.service";
import { lastValueFrom } from "rxjs";
import { Paint } from "../../models/paint";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-edit-paint",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: "./edit-paint.component.html",
})
export class EditPaintComponent implements OnInit {
  paint: Paint;
  paintForm: FormGroup;
  showRunningLow: boolean = true;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private paintService: PaintService,
              private route: ActivatedRoute,
              readonly authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.initPaintForm();
    const color = this.route.snapshot.paramMap.get("id");
    if (!color) {
      throw Error("Color not Found")
    }
    this.paint = await this.paintService.getPaint(color);
    this.initPaintForm();
  }

  initPaintForm(): void {
    this.paintForm = this.formBuilder.group({
      inventory: this.paint?.inventory,
      runningLow: this.paint?.runningLow,
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const paintUpdated = await this.editPaint();
      if (!paintUpdated) {
        throw new Error();
      }
      this.paintForm.reset();
      this.successMessage = "Succeed!";
    } catch (error) {
      this.errorMessage = "Failed! " + this.errorMessage;
    }
  }

  async editPaint(): Promise<Paint> {
    const runningLow = this.authService.canDisplayRunningLow()
      ? this.paintForm.value.runningLow
      : this.paint.runningLow;

    const paint$ = await this.paintService.editPaint(
      this.paint.color,
      this.paintForm.value.inventory,
      runningLow,
    );
    return await lastValueFrom(paint$);
  }
}
