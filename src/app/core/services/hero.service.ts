import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';


/* Nosso hero.service esta adicionando uma mensagem nova a
 * this.messageService.
 */
@Injectable({
  providedIn: 'root'
}) /*Vai retornar um Obesrvable de uma lista de Hero, o off
* o of vai transformar o que está dentro de ()em um Obesrvable
*/

export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  loading = false;

/*
 *GET: obter os dados
 *PUT/PATCH: aletrar os dados
 *POST: criar novo dado
 *DELETE: excluir um dado
 */

 /**
  * /heroes
  * /heroes/is
  * POST /heroes
  * PUT /heroes/id
  * DELETE /heroes/id
  *
  */

  constructor (
    private http: HttpClient,
    private messageService: MessageService) {}

    /*Esse metodo retorna a lista de heroes, onde ele tras
   * essa lista como um Observable. Para executarmos essa lista
   * precisamos umas um .subcribe */

   // GET/heroes
   getAll(): Observable<Hero[]>{
   return this.http.get<Hero[]>(this.heroesUrl).pipe(
    tap((heroes) => this.log(`fetched ${heroes.length} hero(es)`)));
    //usamos tap para fazermos operações necessarias, acima pegarmos
    //o valor do return e jogamos dentro do console.log


    /*
     ESSE FAZ PARTE DO mock-heroes.ts
    const heroes = of(HEROES);
                    of é um operador de criação
    this.log('fetched heroes');
    return heroes;
    */
  }

  /**
   *Este metodo retorna um observable de Hero
   *Estamos percorrendo dentro do HEROES atraves do metodo find
   * do js, sempre que a condição for verdadeira ele retornar pra nós
   * HEROES.find(hero => hero.id == id)!; se isto ocorrer vamos receber um valor
   * @param id
   *
   * Quando trabalhamos com rest
   */

   // GET/heroes/id
  getOne(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`)));
  }

  //GET /heroes?name=term
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap((heroes) =>
        heroes.length
          ? this.log(`found ${heroes.length} hero(es) matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)));

  }

    /*

    ESSE FAZ PARTE DO mock-heroes.ts

    const hero = HEROES.find((hero) => hero.id == id)!; //1º fazemos uma busca
    this.log(`fetched hero id=${id}`); //busca encontrada, essa msg é mostrada ao usuario
    return of(hero);
    */



  //POST /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`create ${this.descAttributes(hero)}`)
      )
    );
  }

  //PUT /heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
      tap((hero) => this.log(`update ${this.descAttributes(hero)}`)
      )
    );
  }

  //DELETE /heroes/id
  delete(hero: Hero): Observable<any>{
    return this.http.delete<any>(this.getUrl(hero.id)).pipe(
      tap(() => this.log(`deleted ${this.descAttributes(hero)}`)
      )
    );
  }

  private descAttributes(hero : Hero): string {
    return `Hero id=${hero.id}, name:${hero.name} and description:${hero.description}`;
  }

  //criamos apenas um local para nossas mensagens
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
  }

  //vai retornar o hero url e o id que passamos como parametro
  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }

}
