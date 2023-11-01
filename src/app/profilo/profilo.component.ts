import { Component } from '@angular/core';
import { PazienteService } from '../services/paziente.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent {

  paziente:any = {};

  constructor(private profiloService:PazienteService, private tokenService:TokenStorageService){}

  ngOnInit(){
    const username = this.tokenService.getUser().preferred_username;
    this.profiloService.getPaziente(username).subscribe({
      next:data=>{
        this.paziente = data;
      },
      error:err=>{
        this.tokenService.refreshToken().subscribe(successo=>{
          if(successo){
            console.log("Refresh token usato correttamente!");
            this.ngOnInit();
          }else{
            console.log("Non siamo riusciti ad usare il refresh token!");
            this.tokenService.signOut();
          }
        })
      }
    })
  }

}
