import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, mapTo, Observable, of, switchMap, take, tap} from "rxjs";
import {Credentials} from "../../models/credentials";
import {User} from "../../models/user";
import {UserStore} from "../store/user.store";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private userStore: UserStore, private router: Router) {
    this.http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }


  register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/register`, credentials);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password}).pipe(
      switchMap(() => this.fetchUser()),
      mapTo(true),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.http.get<any>(`${environment.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    })
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }

}
