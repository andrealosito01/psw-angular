import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgApexchartsModule } from "ng-apexcharts";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PazienteComponent } from './paziente/paziente.component';
import { NutrizionistaComponent } from './nutrizionista/nutrizionista.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiarioComponent } from './diario/diario.component';
import { PianoComponent } from './piano/piano.component';
import { AllenamentoComponent } from './allenamento/allenamento.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { CalorieChartComponent } from './dashboard/calorie-chart/calorie-chart.component';

import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MacroChartComponent } from './dashboard/macro-chart/macro-chart.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';

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
    DashboardComponent,
    DiarioComponent,
    PianoComponent,
    AllenamentoComponent,
    ProfiloComponent,
    CalorieChartComponent,
    MacroChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule
  ],
  providers: [AuthService, TokenStorageService, authInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule {
}
