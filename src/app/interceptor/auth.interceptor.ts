import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken'); // Stelle sicher, dass der Schlüssel korrekt ist

  if (token) {
    request = request.clone({
      setHeaders: { Authorization: `Token ${token}` }
    });
  }

  return next(request).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.removeItem('authToken');
          router.navigateByUrl('/login');
        }
      }
      return throwError(() => err);
    })
  );
};
