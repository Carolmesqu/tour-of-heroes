import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [CommonModule,
            MaterialModule,
            HeroesRoutingModule,
            ReactiveFormsModule,
            SharedModule,
          ],
})
export class HeroesModule {}
