import { Routes } from "@angular/router";
import { ListPaintsComponent } from "./components/paints/list-paints.component";
import { ListUsersComponent } from "./components/users/list-users.component";
import { HomeComponent } from "./components/home/home.component";
import { AddUserComponent } from "./components/users/add-user.component";
import { EditUserComponent } from "./components/users/edit-user.component";
import { EditPaintComponent } from "./components/paints/edit-paint.component";
import { canActivateEditPaintFn, canActivatePaintFn, canActivateUserFn } from "./services/permissions.service";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "paints",
    component: ListPaintsComponent,
    canActivate: [ canActivatePaintFn ],
  },
  {
    path: "paints/:id",
    component: EditPaintComponent,
    canActivate: [ canActivateEditPaintFn ],
  },
  {
    path: "users",
    canActivate: [ canActivateUserFn ],
    component: ListUsersComponent,
  },
  {
    path: "users/add",
    component: AddUserComponent,
    canActivate: [ canActivateUserFn ],
  },
  {
    path: "users/:id",
    component: EditUserComponent,
    canActivate: [ canActivateUserFn ],
  },
];
