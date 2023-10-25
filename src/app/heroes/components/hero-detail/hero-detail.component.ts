import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit  {
  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: [{value: '', disabled: true}],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description:['']
  });
  /**
   *
   * param heroService serve para criar um metodo para buscar nosso hero
   * param location é uma biblioteca que conseguimos interagir com o historico do browser
   * param route ele segura as informações sobre o momento da rota
   */
  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,

  ) {  }

    ngOnInit(): void {
      this.getHero();

    }

    /**
     *Fizemos um get para retornar pelo id na url end point
     *Quando pegamos qlq param que vai passar pelo url, ele será string
     *Por isso falamos que o id é number, porque no hero.service determinamos
     * que ele era uma variavel number.
     */
    getHero(): void {
      const paramId = this.route.snapshot.paramMap.get('id');
      if(paramId !== 'new' ) {
        this.isEditing = true;
        const id = Number(paramId);
        this.heroService.getOne(id).subscribe((hero) => {
          this.hero = hero;
          // @ts-ignore
          this.form.controls['id'].setValue(hero.id);
          this.form.controls['name'].setValue(hero.name);
          this.form.controls['description'].setValue(hero.description);
        });
      }
    }

    goBack(): void{
      this.location.back();
    }

  /** se vier vazio = ' '
   * negar o vazio 1x = ! => true
   * negar o vazio 2x = !! => false (o vazio vai virar (v) e depois (f))
   */

    create(): void {
    const { valid, value } = this.form;
    if(valid){
      const hero: Hero = {
        name: value.name! ,
        description: value.description!
        } as Hero;
      this.heroService.create(hero).subscribe(() => this.goBack());
      } else {
      this.showError();
      }
    }

    update(): void {
      const { valid, value } = this.form;
      if(valid){
        const hero: Hero ={
          id: this.hero.id,
          name: value.name! ,
          description: value.description!
        };
        this.heroService.update(hero).subscribe(() => this.goBack());
      } else {
        this.showError();
      }
    }
    private showError(): void {
      this.snackBar.open('Please check the errors found.', 'Ok', {
        duration: 5000,
        verticalPosition: 'top'
      })

    }
}

/*
 * @Input() hero?: Hero;
 */
