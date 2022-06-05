import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Movement} from "../models/movement";

@Injectable()
export class MovementsService {

  constructor(private http: HttpClient) {}


  getMovements(cardId:string | null, limit:string='5', offset:string='0'): Observable<{ total: number, data: Movement[] }> {
    return this.http.get<{ total: number, data: Movement[] }>
    (`${environment.apiUrl}/cards/${cardId}/movements?limit=${limit}&offset=${offset}`)
  }

}
