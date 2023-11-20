import { Component } from '@angular/core';
import { PazienteService } from '../services/paziente.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Utente } from '../models/utente.model';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})

export class ProfiloComponent {

  paziente!:Utente;

  constructor(private pazienteService:PazienteService, private tokenService:TokenStorageService){}

  ngOnInit(){
    this.pazienteService.getPaziente().subscribe({
      next:data=>{
        this.paziente = data;
      },
      error:err=>{
        alert('Sessione scaduta.\nEffetua nuovamente il login!');
        this.tokenService.signOut();
        window.location.reload();
      }
    })
  }

}
