import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './home/home.component';
import { LeitoresComponent } from './leitores/leitores.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { LeitorComponent } from './leitor/leitor.component';
import { AdicionarLeitorComponent } from './adicionar-leitor/adicionar-leitor.component';
import { LivroComponent } from './livro/livro.component';
import { AdicionarEmprestimoComponent } from './adicionar-emprestimo/adicionar-emprestimo.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    HomeComponent,
    LeitoresComponent,
    EmprestimosComponent,
    LoginComponent,
    LeitorComponent,
    AdicionarLeitorComponent,
    LivroComponent,
    AdicionarEmprestimoComponent,
    EmprestimoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterOutlet,
    FontAwesomeModule,
    LoadingComponent
  ],
  providers: [
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
