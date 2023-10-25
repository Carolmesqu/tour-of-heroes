import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
/*import { DashboardModule } from './dashboard/dashboard.module';
import { HeroesModule } from './heroes/heroes.module';
*/

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    // @angular
    BrowserModule,
    BrowserAnimationsModule,
    //Adicionamos um pacote do angular
    HttpClientModule,

    /*
     * Vamos ocultar essas informações para que nossa aplicão
     * carregue os modulos quando eles realmente forem acessados.
    // feature
    DashboardModule,
    HeroesModule,
    */

    //app
    CoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
