import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Diario } from 'src/app/models/diario.model';
import { VoceDiario } from 'src/app/models/voce-diario.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VoceDiarioService } from 'src/app/services/voce-diario.service';

@Component({
  selector: 'app-diario-viewer',
  templateUrl: './diario-viewer.component.html',
  styleUrls: ['./diario-viewer.component.css']
})
export class DiarioViewerComponent {

  @Input() diario!:Diario;
  @Output() voceAggiunta = new EventEmitter<any>();
  @Output() voceRimossa = new EventEmitter<any>();

  vociColazione!:VoceDiario[];
  vociPranzo!:VoceDiario[];
  vociCena!:VoceDiario[];
  vociSnack!:VoceDiario[];

  constructor(private voceDiarioService:VoceDiarioService, private tokenService:TokenStorageService){}

  ngOnInit(){
  }

  ngOnChanges(){
    this.inizializza();
    this.ripartisci();
  }

  inizializza():void{
    this.vociColazione = [];
    this.vociPranzo = [];
    this.vociCena = [];
    this.vociSnack = [];
  }

  ripartisci():void{
    const vociDiario = this.diario.vociDiario;
    for(let voceDiario of vociDiario){
      switch(voceDiario.pasto){
        case 'Colazione':
          this.vociColazione.push(voceDiario);
          break;
        case 'Pranzo':
          this.vociPranzo.push(voceDiario);
          break;
        case 'Cena':
          this.vociCena.push(voceDiario);
          break;
        case 'Snack':
          this.vociSnack.push(voceDiario);
          break;
      }
    }
  }

  aggiungi(nuovaVoce:VoceDiario):void{
    if(this.diario.id){
      this.voceDiarioService.addVoceDiario(this.diario.id,nuovaVoce).subscribe({
        next:data=>{
          switch(data.pasto){
            case "Colazione":
              this.vociColazione.push(data);
              break;
            case "Pranzo":
              this.vociPranzo.push(data);
              break;
            case "Cena":
              this.vociCena.push(data);
              break;
            case "Snack":
              this.vociSnack.push(data);
              break;
          }
          this.voceAggiunta.emit(data);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })

    }
  }

  modifica(nuovaVoce:any,vecchiaVoce:VoceDiario,i:number):void{
    if(this.diario.id && vecchiaVoce.id){
      this.voceDiarioService.updateVoceDiario(this.diario.id,vecchiaVoce.id,nuovaVoce).subscribe({
        next:data=>{
          // uso queste due variabili per evitarmi l'innesto di switch
          let pastoOrigine:VoceDiario[] = [];
          let pastoDestinazione:VoceDiario[] = [];
          switch(vecchiaVoce.pasto){
            case "Colazione":
              pastoOrigine = this.vociColazione;
              break;
            case "Pranzo":
              pastoOrigine = this.vociPranzo;
              break;
            case "Cena":
              pastoOrigine = this.vociCena;
              break;
            case "Snack":
              pastoOrigine = this.vociSnack;
              break;
          }
          switch(data.pasto){
            case "Colazione":
              pastoDestinazione = this.vociColazione;
              break;
            case "Pranzo":
              pastoDestinazione = this.vociPranzo;
              break;
            case "Cena":
              pastoDestinazione = this.vociCena;
              break;
            case "Snack":
              pastoDestinazione = this.vociSnack;
              break;
          }
          pastoOrigine.splice(i,1);
          pastoDestinazione.push(data);
          this.voceRimossa.emit(vecchiaVoce);
          this.voceAggiunta.emit(data);
        },
        error:err=>{
          console.log(err);
        }
      })
    }
  }

  rimuovi(voce:VoceDiario,i:number):void{
    if(this.diario.id && voce.id){
      this.voceDiarioService.removeVoceDiario(this.diario.id,voce.id).subscribe({
        next:data=>{
          switch(data.pasto){
            case "Colazione":
              this.vociColazione.splice(i,1);
              break;
            case "Pranzo":
              this.vociPranzo.splice(i,1);
              break;
            case "Cena":
              this.vociCena.splice(i,1);
              break;
            case "Snack":
              this.vociSnack.splice(i,1);
              break;
          }
          this.voceRimossa.emit(data);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
    }
  }

}
