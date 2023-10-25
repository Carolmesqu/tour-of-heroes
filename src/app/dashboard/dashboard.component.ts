import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /* 4º criamos uma propriedade chamada heroes, ela é do tipo Hero
   * como nossa interface, é essa propriedade começar com um array
   * vazio. */
  heroes: Hero[] = [];

  /* 2º Injetamos o heroService no constructor. */
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  /* 3º Chamamos o metodo vazio o getHeroes. */
  ngOnInit(): void {
    this.getHeroes();
  }
  /* 1º Inicialmente criamos um metodo vazio, sem retorno. */
  getHeroes(): void{
  /* 5º Vale lembrar que o getHeroes é um observable. Para ele
   * ser executado vamos precisar fazer um .subscribe e o
   * subscribe vai retornar uma lista de heroes.
   * O heroes vai receber um retorno do heroService e getHeroes
   * com um slice, que é um metodo do javascriprt, onde ele vai
   * começar da posição 1 até o 5, porém ele não vai pegar a última
   * posição, no caso ele vai pegar até a 4. No caso se eu não passa-se
   * paramentro nenhum dentro da slice, iria aparecer todos os heroes.
   * (Poderiamos usar o dashboard para uma pesquisa por exemplo,
   * tipo os 4 mais votados.) */
  this.heroService.getAll().subscribe(heroes =>
    this.heroes = heroes.slice(1, 5))

  }

  onSelected(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);

  }

}
