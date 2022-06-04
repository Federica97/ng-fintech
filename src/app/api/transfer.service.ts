import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Contact} from "../models/contact";
import {ContactForm} from "../models/contact-form";

@Injectable()
export class TransferService {


  constructor(private http: HttpClient) {}

  addTransfer(transfer: any):Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/transfer', transfer);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl+'/contacts');
  }

  addContact(contact: ContactForm): Observable<Contact> {
      return this.http.post<Contact>(environment.apiUrl+'/contacts', contact);
  }

  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.apiUrl}/contacts/${id}`)
  }

  putContact(id: string, contact:ContactForm): Observable<Contact> {
    return this.http.put<Contact>(environment.apiUrl+'/contacts/'+id, contact);
  }

}
