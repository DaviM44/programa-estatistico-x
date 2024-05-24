import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  { path: '', redirectTo: 'calc', pathMatch: 'full' }, // Redireciona para 'pau' quando a rota é vazia
  {path: 'calc', component: DataComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
