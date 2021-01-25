import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {

  // AUTH_SERVER = 'http://localhost:3000';
  AUTH_SERVER = 'https://snparatodoss.herokuapp.com/';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { }

  login(user: UserI): Observable<any> {
    // return this.httpClient.post<any>('http://localhost:3000/login',
    return this.httpClient.post<any>('https://snparatodoss.herokuapp.com/login',
    user).pipe(tap(
      (res) => {
        if (res) {
          console.log('Respuesta del back con el accesToken: ');
          console.log(res.accessToken);
          this.saveToken(res.accessToken);
        }
      }
    ));
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
  }

  // saveToken es un método
  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

}
