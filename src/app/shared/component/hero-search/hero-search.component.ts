import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Hero} from "../../../core/models/hero.model";
import {HeroService} from "../../../core/services/hero.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  @Input() label = '';

  private searchTerm = new Subject<string>();
  @Output() private selected = new EventEmitter<Hero>();

  constructor(
    private heroService: HeroService

  ) { }
//debounceTime para dar um delay na busca, um tempo
  // distinctUntilChanged só vai executar se o valor for diferente dq estavamos digitando antes
  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.heroService.search(term))
    );
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void{
    this.searchTerm.next('');
    //essa linha acima é para o campo onde digitamos ficar limmpo caso vamos cancelar ele
    const hero: Hero = selectedItem.option.value;
    this.selected.emit(hero);
  }

  search(term: string): void {
    this.searchTerm.next(term);

  }

}
