import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUser = new ReplaySubject<User>(1);
  private authUser: User;

  whoAmI(): ReplaySubject<User> {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.authUser !== null;
  }

  logInAs(user: User): void {
    this.currentUser.next(user);
    this.authUser = user;
  }

  canAdminUsers(): boolean {
    return this.authUser ? this.authUser.permissions.adminUsers!! : false;
  }

  canViewPaints(): boolean {
    return this.authUser ? this.authUser.permissions.viewPaints!! : false;
  }

  canEditPaints(): boolean {
    return this.authUser ? this.authUser.permissions.editPaints!! : false;
  }

  canDisplayRunningLow(): boolean {
    return this.authUser?.role
      ? ["admin", "viewer", "manager"].includes(this.authUser?.role!!)
      : false;
  }
}
