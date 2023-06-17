import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBodyUserInfo } from './types';

const AUTH_API = 'http://localhost:8080/api/auth/';
const BIKE_API = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, accountType: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        roles: [accountType]
      },
      httpOptions
    );
  }

  createBike(body:{brand: string, size: number, color:string, registration: string, username: string}): Observable<any> {
    return this.http.post(
      BIKE_API + 'bike',
      {
        brand: body.brand,
        size: body.size,
        color: body.color,
        registration: body.registration,
        username: body.username
      },
      httpOptions
    );

  }

  getAllBikes(username: string): Observable<any> {
    return this.http.get(
      `${BIKE_API}${username}/bikes`,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  createUserInfo(body: IBodyUserInfo, username: string): Observable<any> {
    return this.http.post(
      BIKE_API + 'info',
      {
        ...body,
        username
      },
      httpOptions
    );
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(
      `${BIKE_API}${username}/info`,
      httpOptions
    );
  }
}
