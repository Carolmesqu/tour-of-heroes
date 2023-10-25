import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found.component';

/* Este é o nosso arquivo de rota */

//Criamos uma constante chamada route não podemos esquecer que
//ela é de um tipo, o route faz parte de um modulo do angular
// dentro do Route vamos especificar algumas rotas
const routes: Routes = [
  /* Criamos uma rota direta para o /dasboard, ao invés de
   * ficar vazio o local */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
    import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  ];
//Adicionamos o router module que também faz parte do pacote @angular/router
//O forRoot para minha aplicação raiz, a aplicação inicial que dela deve
//iniciar com a constante routes.
//Então importamos um modulo que vai fazer que nossas rotas estejam disponiveis
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
