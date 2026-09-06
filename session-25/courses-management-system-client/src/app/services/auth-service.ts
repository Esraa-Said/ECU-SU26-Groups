import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Service()
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/v1/auth';

  private httpClient = inject(HttpClient);

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const decoded = jwtDecode<any>(token);
      console.log(decoded);

      const expirationDate = new Date(decoded.exp * 1000);
      console.log(expirationDate);
      if (!expirationDate || expirationDate < new Date()) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      return false;
    }
  }

  signin(credentials: { email: string; password: string }) {
    return this.httpClient.post<any>(`${this.baseUrl}/signin`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        console.log(localStorage);
      }),
    );
  }

  signup(userData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/signup`, userData).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        console.log(localStorage);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
