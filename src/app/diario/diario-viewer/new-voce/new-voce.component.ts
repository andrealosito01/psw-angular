import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Alimento } from 'src/app/models/alimento.model';
import { ConcreteVoceDiario, VoceDiario } from 'src/app/models/voce-diario.model';
import { AlimentoService } from 'src/app/services/alimento.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-new-voce',
  templateUrl: './new-voce.component.html',
  styleUrls: ['./new-voce.component.css']
})
export class NewVoceComponent {

  @Input() voce?:VoceDiario;
  @Input() pasto!:string;

  @Output() voceRimossa = new EventEmitter<any>();
  @Output() voceAggiunta = new EventEmitter<any>();
  @Output() voceModificata = new EventEmitter<any>();

  alimenti?:Alimento[];
  alimentiNutrizionista?:Alimento[];
  nuovaVoce?:VoceDiario;
  form?:FormGroup;
  alimentoNonTrovato:boolean = false;
  isNew:boolean = false;

  constructor(private modalService:NgbModal, private alimentoService:AlimentoService,
    private tokenService:TokenStorageService){}

  ngOnInit(){
  }

  open(content:any){
    if(this.voce){
      this.copiaVoce();
      this.inizializzaForm();
    }else{
      this.alimentoService.getAlimenti().subscribe({
        next:data=>{
          this.alimenti = data;
          this.alimentoService.getAlimentiNutrizionista().subscribe({
            next:data=>{
              this.alimentiNutrizionista = data;
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        // Chiamato quando si salva correttamente
        if(this.nuovaVoce && this.form){
          this.nuovaVoce.pasto = this.form.get('myPasto')?.value;
          if(result == 'Aggiungi')
            this.voceAggiunta.emit(this.nuovaVoce);
          else if(result == 'Modifica')
            this.voceModificata.emit(this.nuovaVoce);
          setTimeout(() => {
            this.nuovaVoce = undefined;
            this.alimentoNonTrovato = false;
          }, 500);
        }
      },
      (reason) => {
        // Chiamato quando il modal viene chiuso in altro modo (ad esempio, cliccando fuori)
        if(this.isNew)
          // Se nella voce non c'è l'id vuol dire che è una voce che ho creato adesso nel front-end
          setTimeout(() => {
            this.nuovaVoce = undefined;
            this.alimentoNonTrovato = false;
          }, 500);
      }
    );
  }

  private copiaVoce():void{
    if(this.voce)
      this.nuovaVoce = new ConcreteVoceDiario(
        this.voce.quantita,
        this.voce.pasto,
        this.voce.nome,
        this.voce.descrizione,
        this.voce.energia,
        this.voce.proteine,
        this.voce.carboidrati,
        this.voce.fibre,
        this.voce.zuccheri,
        this.voce.grassiTotali,
        this.voce.grassiSaturi,
        this.voce.grassiPolinsaturi,
        this.voce.grassiMonoinsaturi,
        this.voce.grassiTrans,
        this.voce.colesterolo,
        this.voce.sodio,
        this.voce.potassio,
        this.voce.vitaminaA,
        this.voce.vitaminaC,
        this.voce.calcio,
        this.voce.ferro
      )
  }

  private inizializzaForm():void{
    if(this.nuovaVoce){
      this.form = new FormGroup({
        myNome: new FormControl({value:this.nuovaVoce.nome,disabled:true}),
        myDescrizione: new FormControl({value:this.nuovaVoce.descrizione,disabled:true}),
        myPorzione: new FormControl({value:"100g",disabled:true}),
        myQuantita: new FormControl(this.nuovaVoce.quantita,Validators.compose([Validators.required,this.quantitaAccettabile])),
        myPasto: new FormControl(this.nuovaVoce.pasto, Validators.required)
      })
      this.form.get('myQuantita')?.valueChanges.subscribe((nuovaQuantita)=>{
        if(nuovaQuantita > 0){
          this.aggiornaVoce(nuovaQuantita);
        }
      })
    }
  }

  private quantitaAccettabile(control:any){
    const valore = control.value;

    if (valore && valore <= 0) {
      return { 'numeroPositivo': true };
    }

    return null;
  }

  private aggiornaVoce(quantita:number){
    if(this.nuovaVoce){
      this.nuovaVoce.energia = parseFloat((this.nuovaVoce.energia * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      this.nuovaVoce.proteine = parseFloat((this.nuovaVoce.proteine * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      this.nuovaVoce.carboidrati = parseFloat((this.nuovaVoce.carboidrati * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.fibre)
        this.nuovaVoce.fibre = parseFloat((this.nuovaVoce.fibre * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.zuccheri)
        this.nuovaVoce.zuccheri = parseFloat((this.nuovaVoce.zuccheri * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      this.nuovaVoce.grassiTotali = parseFloat((this.nuovaVoce.grassiTotali * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.grassiSaturi)
        this.nuovaVoce.grassiSaturi = parseFloat((this.nuovaVoce.grassiSaturi * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.grassiPolinsaturi)
        this.nuovaVoce.grassiPolinsaturi = parseFloat((this.nuovaVoce.grassiPolinsaturi * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.grassiMonoinsaturi)
        this.nuovaVoce.grassiMonoinsaturi = parseFloat((this.nuovaVoce.grassiMonoinsaturi * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.grassiTrans)
        this.nuovaVoce.grassiTrans = parseFloat((this.nuovaVoce.grassiTrans * (quantita/this.nuovaVoce.quantita)).toFixed(1));
      if(this.nuovaVoce.colesterolo)
        this.nuovaVoce.colesterolo = parseFloat((this.nuovaVoce.colesterolo * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.sodio)
        this.nuovaVoce.sodio = parseFloat((this.nuovaVoce.sodio * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.potassio)
        this.nuovaVoce.potassio = parseFloat((this.nuovaVoce.potassio * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.vitaminaA)
        this.nuovaVoce.vitaminaA = parseFloat((this.nuovaVoce.vitaminaA * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.vitaminaC)
        this.nuovaVoce.vitaminaC = parseFloat((this.nuovaVoce.vitaminaC * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.calcio)
        this.nuovaVoce.calcio = parseFloat((this.nuovaVoce.calcio * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      if(this.nuovaVoce.ferro)
        this.nuovaVoce.ferro = parseFloat((this.nuovaVoce.ferro * (quantita/this.nuovaVoce.quantita)).toFixed(0));
      this.nuovaVoce.quantita = quantita;
    }
  }

  chiediConfermaRimozione(event:Event): void {
    const conferma = window.confirm('Sei sicuro di voler rimuovere questa voce?');
    if(conferma) {
      this.voceRimossa.emit();
    }
    event.stopPropagation();
  }

  seleziona(alimento:Alimento){
    if(!this.nuovaVoce){
      const nuovaVoce = new ConcreteVoceDiario(
        1,
        this.pasto,
        alimento.nome,
        alimento.descrizione,
        alimento.energia,
        alimento.proteine,
        alimento.carboidrati,
        alimento.fibre,
        alimento.zuccheri,
        alimento.grassiTotali,
        alimento.grassiSaturi,
        alimento.grassiPolinsaturi,
        alimento.grassiMonoinsaturi,
        alimento.grassiTrans,
        alimento.colesterolo,
        alimento.sodio,
        alimento.potassio,
        alimento.vitaminaA,
        alimento.vitaminaC,
        alimento.calcio,
        alimento.ferro
      )
      this.nuovaVoce = nuovaVoce;
      this.isNew = true;
      this.inizializzaForm();
    }
  }

  cercaAlimento(barCode:string){
    this.alimentoService.getAlimentoByBarCode(barCode).subscribe({
      next:data=>{
        this.seleziona(data);
      },
      error:err=>{
        console.log(err);
        this.alimentoNonTrovato = true;
      }
    })
  }

  arrotondaQuantita(quantita:number){
    return parseFloat(quantita.toFixed(0));
  }

}
