import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-paziente',
  templateUrl: './paziente.component.html',
  styleUrls: ['./paziente.component.css']
})
export class PazienteComponent {

  isMenuCollapsed:boolean = true;

  constructor(private tokenService:TokenStorageService){}

  selected = 'dashboard';

  change(scelta:string):void{
    this.selected = scelta;
  }

  logout():void{
    this.tokenService.signOut();
    window.location.reload();
  }

}
