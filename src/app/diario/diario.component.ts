import { DiarioService } from './../services/diario.service';
import { Component, Input } from '@angular/core';
import { PianoService } from '../services/piano.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Diario } from '../models/diario.model';
import { Sort } from '@angular/material/sort';
import { Piano } from '../models/piano.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VoceDiario } from '../models/voce-diario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface totaliPerPasto {
  pasto:string;
  calorie: number;
  carboidrati: number;
  fibre: number;
  grassi: number;
  proteine: number;
}

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})

export class DiarioComponent {

  totali!: totaliPerPasto[];
  sortedData!: totaliPerPasto[];

  @Input() selectedData!:Date;
  diario!:Diario;
  piano!:Piano;

  formAcqua!:FormGroup;
  abilitato:boolean = true;

	constructor(private diarioService:DiarioService, private pianoService:PianoService,
    private tokenService:TokenStorageService, private modalService:NgbModal) { }

  ngOnInit(){
    this.selectedData = new Date();
    this.selectedData.setHours(0,0,0,0);
    this.pianoService.getPiano().subscribe({
      next:data=>{
        this.piano = data;
        this.onDateSelected();
      },
      error:err=>{
        alert('Sessione scaduta.\nEffetua nuovamente il login!');
        this.tokenService.signOut();
        window.location.reload();
      }
    })
  }

  onDateSelected(){
    this.diarioService.getDiario(this.selectedData.getTime()).subscribe({
      next:data=>{
        this.diario = data;
        this.inizializzaForm();
        this.calcolaTotali();
        this.sortedData = this.totali.slice();
      },
      error:err=>{
        alert('Sessione scaduta.\nEffetua nuovamente il login!');
        this.tokenService.signOut();
        window.location.reload();
      }
    })
  }

  inizializzaForm(){
    this.formAcqua = new FormGroup  ({
      myIncremento: new FormControl(0,Validators.compose([Validators.required,this.numeroPositivoValidator]))
    })
  }

  numeroPositivoValidator = (control:any) => {
    const nuovoValore = this.diario.acqua + control.value;

    if (nuovoValore < 0) {
      return { 'numeroPositivo': true };
    }

    return null;
  };

  calcolaTotali(){
    const totaliColazione:totaliPerPasto = {
      pasto:"Colazione",
      calorie:0,
      carboidrati:0,
      fibre:0,
      grassi:0,
      proteine:0
    }
    const totaliPranzo:totaliPerPasto = {
      pasto:"Pranzo",
      calorie:0,
      carboidrati:0,
      fibre:0,
      grassi:0,
      proteine:0
    }
    const totaliCena:totaliPerPasto = {
      pasto:"Cena",
      calorie:0,
      carboidrati:0,
      fibre:0,
      grassi:0,
      proteine:0
    }
    const totaliSnack:totaliPerPasto = {
      pasto:"Snack",
      calorie:0,
      carboidrati:0,
      fibre:0,
      grassi:0,
      proteine:0
    }

    this.diario.vociDiario.forEach(element => {
      switch(element.pasto){
        case "Colazione":
          totaliColazione.calorie += element.energia;
          totaliColazione.carboidrati += element.carboidrati;
          totaliColazione.fibre += element.fibre;
          totaliColazione.grassi += element.grassiTotali;
          totaliColazione.proteine += element.proteine;
          break;
        case "Pranzo":
          totaliPranzo.calorie += element.energia;
          totaliPranzo.carboidrati += element.carboidrati;
          totaliPranzo.fibre += element.fibre;
          totaliPranzo.grassi += element.grassiTotali;
          totaliPranzo.proteine += element.proteine;
          break;
        case "Cena":
          totaliCena.calorie += element.energia;
          totaliCena.carboidrati += element.carboidrati;
          totaliCena.fibre += element.fibre;
          totaliCena.grassi += element.grassiTotali;
          totaliCena.proteine += element.proteine;
          break;
        case "Snack":
          totaliSnack.calorie += element.energia;
          totaliSnack.carboidrati += element.carboidrati;
          totaliSnack.fibre += element.fibre;
          totaliSnack.grassi += element.grassiTotali;
          totaliSnack.proteine += element.proteine;
          break;
      }
    });

    this.totali = [totaliColazione,totaliPranzo,totaliCena,totaliSnack];
  }

  onSubmit(){
    const incremento = this.formAcqua.get('myIncremento')?.value;
    if(incremento){
      const copiaDiario = {...this.diario};
      copiaDiario.acqua += incremento;
      this.diarioService.updateDiario(copiaDiario).subscribe({
        next:data=>{
          this.abilitato = false;
          this.diario = data;
          setTimeout(() => {
            this.abilitato = true;
          }, 1000);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
    }
  }

  sortData(sort: Sort) {
    const data = this.totali.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.pasto, b.pasto, isAsc);
        case 'calories':
          return compare(a.calorie, b.calorie, isAsc);
        case 'fat':
          return compare(a.grassi, b.grassi, isAsc);
        case 'carbs':
          return compare(a.carboidrati, b.carboidrati, isAsc);
        case 'fibre':
          return compare(a.fibre, b.fibre, isAsc);
        case 'protein':
          return compare(a.proteine, b.proteine, isAsc);
        default:
          return 0;
      }
    });
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  aggiungi(voce:VoceDiario):void{
    this.diario.vociDiario.push(voce);
    this.calcolaTotali();
    this.sortedData = this.totali.slice();
  }

  rimuovi(voce:VoceDiario):void{
    for(let i=0; i<this.diario.vociDiario.length; i++)
      if(this.diario.vociDiario[i].id == voce.id){
        this.diario.vociDiario.splice(i,1);
        break;
      }
    this.calcolaTotali();
    this.sortedData = this.totali.slice();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
