import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeComponent } from './home/home.component';
import { LeitoresComponent } from './leitores/leitores.component';
import { EmprestimosComponent } from './emprestimos/emprestimos.component';
import { LoginComponent } from './login/login.component';
import { AdicionarLeitorComponent } from './adicionar-leitor/adicionar-leitor.component';
import { LeitorComponent } from './leitor/leitor.component';
import { LivroComponent } from './livro/livro.component';
import { AdicionarEmprestimoComponent } from './adicionar-emprestimo/adicionar-emprestimo.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:id', component: LivroComponent },
  { path: 'leitores', component: LeitoresComponent },
  { path: 'leitores/adicionar', component: AdicionarLeitorComponent },
  { path: 'leitores/:id', component: LeitorComponent },
  { path: 'emprestimos', component: EmprestimosComponent },
  { path: 'emprestimos/adicionar', component: AdicionarEmprestimoComponent },
  { path: 'emprestimos/:id', component: EmprestimoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
