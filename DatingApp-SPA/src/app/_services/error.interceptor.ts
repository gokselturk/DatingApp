import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpHeaderResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse){

                    if (error.status === 401){
                        return throwError(error.statusText + ' - Message: ' + error.error);
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError){
                        console.error(applicationError);
                        return throwError(applicationError);
                    }

                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (serverError){
                        if (typeof serverError === 'object'){
                                for (const key in serverError.errors){
                                    if (serverError.errors[key]){
                                        modalStateErrors += serverError.errors[key] + '\n';
                                    }
                                }
                        }
                    }

                    return throwError( modalStateErrors || serverError || 'Server Error');
                }
                else{
                    return throwError('Unknown Error') ;
                }

            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
