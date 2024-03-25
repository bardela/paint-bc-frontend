import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { lastValueFrom, Observable } from "rxjs";
import { Paint } from "../models/paint";

@Injectable({
  providedIn: "root"
})
export class PaintService {
  private urlPath = environment.backend + "paints/";
  constructor(private http: HttpClient) {
  }

  async getPaints(): Promise<Paint[]> {
    const $paints = this.http.get<Paint[]>(this.urlPath, { });
    return await lastValueFrom($paints);
  }

  async getPaint(color: string): Promise<Paint> {
    const paints = await this.getPaints();
    return paints.find(paint => paint.color === color)!;
  }

  editPaint(color: string, inventory: number, runningLow: number): Observable<Paint> {
    return this.http.put<Paint>(this.urlPath + color, { inventory, runningLow });
  }
}
