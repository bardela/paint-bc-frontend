import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(readonly authService: AuthService) {}

  canActivatePaint(): boolean {
    return this.authService.canViewPaints();
  }
  canActivateEditPaint(): boolean {
    return this.authService.canEditPaints();
  }
  canActivateUser(): boolean {
    return this.authService.canAdminUsers();
  }
}

export const canActivatePaintFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivatePaint();
};

export const canActivateEditPaintFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivateEditPaint();
};

export const canActivateUserFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivateUser();
};
