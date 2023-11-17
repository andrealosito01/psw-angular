import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { SchedeService } from '../services/schede.service';
import { Scheda } from '../models/scheda.model';

@Component({
  selector: 'app-allenamento',
  templateUrl: './allenamento.component.html',
  styleUrls: ['./allenamento.component.css']
})
export class AllenamentoComponent {

  schedeAttive:Scheda[] = [];
  schedeInattive:Scheda[] = [];

  constructor(private tokenService:TokenStorageService, private schedeService:SchedeService){}

  ngOnInit(){
    this.schedeService.getSchede().subscribe({
      next:data=>{
        for(let scheda of data)
          if(scheda.attiva)
            this.schedeAttive.push(scheda)
          else
            this.schedeInattive.push(scheda);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
