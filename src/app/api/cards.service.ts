import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, share} from "rxjs";
import {Card} from "../models/card";
import {environment} from "../../environments/environment";
import {CardForm} from "../models/card-form";

@Injectable()
export class CardsService {


  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl + '/cards');
  }

  addCard(card: CardForm):Observable<Card> {
    return this.http.post<Card>(environment.apiUrl + '/cards', card);
  }

  deleteCard(id: string):Observable<Card> {
    return this.http.delete<Card>(`${environment.apiUrl}/cards/${id}`);
  }
}
