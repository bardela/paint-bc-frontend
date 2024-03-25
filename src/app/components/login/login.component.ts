import { Component } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  checkoutForm = this.formBuilder.group({
    name: "",
    password: ""
  });

  constructor(private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    this.checkoutForm.reset();
  }
}
