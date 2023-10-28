import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-paziente',
  templateUrl: './paziente.component.html',
  styleUrls: ['./paziente.component.css']
})
export class PazienteComponent {

  constructor(private tokenService:TokenStorageService){}

  logout():void{
    this.tokenService.signOut();
    window.location.reload();
  }

}
