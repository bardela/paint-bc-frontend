import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, Observable } from "rxjs";
import { User } from "../models/user";
import { Role } from "../models/types";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private urlPath = environment.backend + "users/";

  constructor(private http: HttpClient) {
  }

  async getUsers(): Promise<User[]> {
    const $users = this.http.get<User[]>(this.urlPath, { });
    return await lastValueFrom($users);
  }

  async getUser(id: number): Promise<User> {
    const users = await this.getUsers();
    return users.find(user => user.id === id)!;
  }

  addUser(name: string, age: number, role: Role): Observable<User> {
    return this.http.post<User>(this.urlPath, { name, age, role });
  }

  editUser(id: number, name: string, age: number, role: Role): Observable<User> {
    return this.http.put<User>(this.urlPath + id, { name, age, role });
  }
}
