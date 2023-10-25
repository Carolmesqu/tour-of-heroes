import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  /**
   * Pegamos o loadingSubject e dizemos que queremos apenas o observable dele
   * e atribuimos para no propriedade loading$
   * */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // criamos um atributo do tipo observable, uma boa pratica é colocar o $
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  hide(): void {
    this.loadingSubject.next(false);

  }
  show(): void {
    this.loadingSubject.next(true);
  }
}
