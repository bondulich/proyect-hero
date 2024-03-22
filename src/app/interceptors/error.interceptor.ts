import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notification.service";

export const errorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const notificationService = inject(NotificationService);

    return next(req).pipe(
        catchError(errorData => {
            notificationService.showSnackBar('Error on connect with api', 'Accept');
            return throwError(() => new Error(errorData));
        })
    );
};