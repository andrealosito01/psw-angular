import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PazienteComponent } from './paziente/paziente.component';
import { NutrizionistaComponent } from './nutrizionista/nutrizionista.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiarioComponent } from './diario/diario.component';
import { PianoComponent } from './piano/piano.component';
import { AllenamentoComponent } from './allenamento/allenamento.component';
import { ProfiloComponent } from './profilo/profilo.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'paziente', component:PazienteComponent, children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'diario', component:DiarioComponent},
    {path:'piano', component:PianoComponent},
    {path:'allenamento', component:AllenamentoComponent},
    {path:'profilo', component:ProfiloComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]},
  {path:'nutrizionista', component:NutrizionistaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
