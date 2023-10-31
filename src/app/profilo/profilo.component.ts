import { Component } from '@angular/core';
import { PazienteService } from '../services/paziente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent {

  constructor(private profiloService:PazienteService){}

}
