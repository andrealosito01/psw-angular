import { VoceDiario } from './../models/voce-diario.model';
import { DiarioService } from './../services/diario.service';
import { PianoService } from './../services/piano.service';
import { Component } from "@angular/core";
import { format } from 'date-fns';
import { PesoService } from "../services/peso.service";
import { Peso } from "../models/peso.model";
import { TokenStorageService } from "../services/token-storage.service";
import { PassiService } from "../services/passi.service";
import { Passi } from "../models/passi.model";
import { Piano } from '../models/piano.model';
import { ConcreteDiario } from '../models/diario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  valoriPesi!:number[];
  datePesi!:string[];
  valoriPassi!:number[];
  datePassi!:string[];
  energia:number = 0;
  obiettivoEnergia!:number;
  macroAttuali:number[] = [0,0,0,0];
  obiettivi!:number[];
  pianoLoaded:boolean = false;

  constructor(private diarioService:DiarioService, private pianoService:PianoService,
    private pesoService:PesoService, private passiService:PassiService,private tokenService:TokenStorageService){}

  ngOnInit(){
    const oggi = new Date();
    oggi.setHours(0,0,0,0);

    // Prendo i pesi dell'utente
    this.pesoService.getPesi(0,7).subscribe({
      next:data=>{
        const pesi:Peso[] = data.content;
        this.caricaPesi(pesi);
        // Prendo i passi dell'utente
        this.passiService.getPassi(0,7).subscribe({
          next:data=>{
            const passi:Passi[] = data.content;
            this.caricaPassi(passi);
            // Prendo il diario di oggi
            this.diarioService.getDiario(oggi.getTime()).subscribe({
              next:data=>{
                const vociDiario:VoceDiario[] = data.vociDiario;
                if(vociDiario.length > 0)
                  this.calcolaTotale(vociDiario);
                // Prendo il piano dell'utente
                this.pianoService.getPiano().subscribe({
                  next:data=>{
                    const piano:Piano = data;
                    if(piano)
                      this.caricaObiettivi(piano);
                    this.pianoLoaded = true;
                  },
                  error:err=>{
                    alert('Sessione scaduta.\nEffetua nuovamente il login!');
                    this.tokenService.signOut();
                    window.location.reload();
                  }
                })
              },
              error:err=>{
                if(err.status == 404){
                  const nuovoDiario = new ConcreteDiario(oggi.getTime());
                  this.diarioService.addDiario(nuovoDiario).subscribe({
                    next:data=>{
                      const vociDiario:VoceDiario[] = data.vociDiario;
                      if(vociDiario.length > 0)
                        this.calcolaTotale(vociDiario);
                      // Prendo il piano dell'utente
                      this.pianoService.getPiano().subscribe({
                        next:data=>{
                          const piano:Piano = data;
                          if(piano)
                            this.caricaObiettivi(piano);
                          this.pianoLoaded = true;
                        },
                        error:err=>{
                          alert('Sessione scaduta.\nEffetua nuovamente il login!');
                          this.tokenService.signOut();
                          window.location.reload();
                        }
                      })
                    },
                    error:err=>{
                      alert('Sessione scaduta.\nEffetua nuovamente il login!');
                      this.tokenService.signOut();
                      window.location.reload();
                    }
                  })
                }else{
                  alert('Sessione scaduta.\nEffetua nuovamente il login!');
                  this.tokenService.signOut();
                  window.location.reload();
                }
              }
            })
          },
          error:err=>{
            alert('Sessione scaduta.\nEffetua nuovamente il login!');
            this.tokenService.signOut();
            window.location.reload();
          }
        })
      },
      error:err=>{
        alert('Sessione scaduta.\nEffetua nuovamente il login!');
        this.tokenService.signOut();
        window.location.reload();
      }
    })
  }

  private calcolaTotale(vociDiario:VoceDiario[]):void{
    let totEnergia = 0;
    let totCarboidrati = 0;
    let totFibre = 0;
    let totProteine = 0;
    let totGrassiTotali = 0;

    for(let i = 0; i<vociDiario.length; i++){
      totEnergia += vociDiario[i].energia;
      totCarboidrati += vociDiario[i].carboidrati;
      totFibre += vociDiario[i].fibre;
      totProteine += vociDiario[i].proteine;
      totGrassiTotali += vociDiario[i].grassiTotali;
    }

    this.energia = totEnergia;
    this.macroAttuali[0] = totCarboidrati;
    this.macroAttuali[1] = totFibre;
    this.macroAttuali[2] = totProteine;
    this.macroAttuali[3] = totGrassiTotali;
  }

  private caricaObiettivi(piano:Piano):void{
    this.obiettivoEnergia = piano.energia;
    this.obiettivi = [];
    this.obiettivi.push(piano.carboidrati);
    this.obiettivi.push(piano.fibre);
    this.obiettivi.push(piano.proteine);
    this.obiettivi.push(piano.grassiTotali);
  }

  private caricaPesi(pesi:Peso[]):void{
    this.valoriPesi = [];
    this.datePesi = [];
    const formato = "dd/MM/yyyy";
    for(let i=0;i<pesi.length;i++){
      this.valoriPesi.push(pesi[i].valore);
      this.datePesi.push(format(new Date(pesi[i].data),formato));
    }
  }

  private caricaPassi(passi:Passi[]):void{
    this.valoriPassi = [];
    this.datePassi = [];
    const formato = "dd/MM/yyyy";
    for(let i=0;i<passi.length;i++){
      this.valoriPassi.push(passi[i].valore);
      this.datePassi.push(format(new Date(passi[i].data),formato));
    }
  }

}
