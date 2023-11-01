import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PazienteComponent } from './paziente/paziente.component';
import { NutrizionistaComponent } from './nutrizionista/nutrizionista.component';
import { DiarioComponent } from './diario/diario.component';
import { PianoComponent } from './piano/piano.component';
import { AllenamentoComponent } from './allenamento/allenamento.component';
import { ProfiloComponent } from './profilo/profilo.component';

import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './helpers/auth.interceptor';

const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PazienteComponent,
    NutrizionistaComponent,
    DiarioComponent,
    PianoComponent,
    AllenamentoComponent,
    ProfiloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, TokenStorageService, authInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }

