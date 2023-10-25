import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  /**
   * Quando for feita uma chamada HTTP o LoadingInterceptor vai chegar a requisição para o
   * intercept e vai fazer um if se não tiver nada ele vai mostrar carregando. Com o return
   * nossa requisição vai continuar caso esteja chegando ele vai mostrar a página e esconder
   * a barra de carregamento. No caso começa com 0, ele acrescenta 1 com o ++ após feita
   * a requisição ele diminui 1 com o -- e retorna a página.
   */

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.activeRequests == 0) {
      this.loadingService.show();
    }
    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests == 0){
          this.loadingService.hide();
        }
      })
    );
  }
}
