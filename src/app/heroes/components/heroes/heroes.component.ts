import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import {DialogData} from "../../../core/models/dialog.data.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../core/components/confirmation-dialog/confirmation-dialog.component";

/* Nosso componente de heroes esta obtendo a lista de heroes */

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  displayColumns: string[] = ['id', 'name', 'description', 'actions'];
  heroes: Hero[] = [];
   /*selectedHero?: Hero;
  Dentro do heroes.component vamos mostrar uma mensgaem quando selecionarmos um heroi
   *injetamos o messageService no construtor e vamos adicionar essa mensagem no onSelect
   *private messageService: MessageService
   */
  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe(heroes =>
      this.heroes = heroes);
  }

  delete(hero : Hero): void{
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content:`Delete '${hero.name}'?`
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width:'300px'
    })

    //Somente se o resultado de delete for confirmado então ele vai fazer um afterClosed
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.heroService.delete(hero).subscribe(() => {
          //this.heroes = this.heroes.filter((h) => h == hero);
          this.getHeroes();
        });
      }
    })


  }

  onSelected(hero: Hero): void{
    this.delete(hero);
  }

  /* Esse metodo abaixo seleciona o herói, neste metodo chamamos o hero
   * e a mensagem. Incluimos uma interpolação de string utilizamos crase `
   * na nosso templante string que é `HeroesComponent: Selected hero id=`
   * vinculamos o hero.id ${}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id= ${hero.id}`)
  }
  no html de component heroes

  */
}
