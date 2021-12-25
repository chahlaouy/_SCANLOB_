import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { getAuthenticatedUserToken } from "../auth/state/auth.selectors";
import { AppState } from "../state/app.state";


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor{

  constructor(
    private store: Store<AppState>
  ){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>>
  {
    return this.store.select(getAuthenticatedUserToken).pipe(
      take(1),
      exhaustMap(token => {
        if(!token){
          return next.handle(request);
        }
        let mofidifiedRequest = request.clone({
          // params: request.params.append("auth", token)
          setHeaders: {
            Authorization: "Bearer " + token
        }
        });

        return next.handle(mofidifiedRequest);
      })
    )
  }
}
