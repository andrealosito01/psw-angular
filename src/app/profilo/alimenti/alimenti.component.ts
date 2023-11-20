import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Alimento, ConcreteAlimento } from 'src/app/models/alimento.model';
import { AlimentoService } from 'src/app/services/alimento.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-alimenti',
  templateUrl: './alimenti.component.html',
  styleUrls: ['./alimenti.component.css']
})

export class AlimentiComponent {

  private modalRef!:NgbModalRef;

  alimenti!:Alimento[];
  form!:FormGroup;

  alimentoGiaInserito:boolean = false;
  idDaModificare?:number;
  numDaModificare?:number;

  constructor(private tokenService:TokenStorageService, private alimentoService:AlimentoService, private modalService:NgbModal){}

  ngOnInit(){
    this.alimentoService.getAlimenti().subscribe({
      next:data=>{
        this.alimenti = data;
      },
      error:err=>{
        alert('Sessione scaduta.\nEffetua nuovamente il login!');
        this.tokenService.signOut();
        window.location.reload();
      }
    })
  }

  chiediConfermaRimozione(alimento:Alimento,num:number): void {
    const conferma = window.confirm('Sei sicuro di voler rimuovere questo alimento?');
    if(conferma)
      this.eliminaAlimento(alimento,num);
  }

  eliminaAlimento(alimento:Alimento,num:number){
    if(alimento.id)
      this.alimentoService.deleteAlimento(alimento.id).subscribe({
        next:data=>{
          this.alimenti.splice(num,1);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
  }

  open(content: TemplateRef<any>, alimento?:Alimento, num?:number) {
    if(num != null)
      this.numDaModificare = num;
    this.inizializzaForm(alimento);
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
			(result) => {
        this.alimentoGiaInserito = false;
        this.idDaModificare = undefined;
        this.numDaModificare = undefined;
			},
			(reason) => {
        this.alimentoGiaInserito = false;
        this.idDaModificare = undefined;
        this.numDaModificare = undefined;
			},
		);
	}

  inizializzaForm(alimento?:Alimento){
    if(alimento)
      this.idDaModificare = alimento.id;

    this.form = new FormGroup({
      myNome:new FormControl(alimento?.nome,Validators.compose([Validators.required,Validators.max(64)])),
      myDescrizione:new FormControl(alimento?.descrizione,Validators.compose([Validators.required,Validators.max(64)])),
      myEnergia:new FormControl(alimento?.energia,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myProteine:new FormControl(alimento?.proteine,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myCarboidrati:new FormControl(alimento?.carboidrati,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myFibre:new FormControl(alimento?.fibre,Validators.compose([this.numeroPositivoValidator])),
      myZuccheri:new FormControl(alimento?.zuccheri,Validators.compose([this.numeroPositivoValidator])),
      myGrassiTotali:new FormControl(alimento?.grassiTotali,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myGrassiSaturi:new FormControl(alimento?.grassiSaturi,Validators.compose([this.numeroPositivoValidator])),
      myGrassiPolinsaturi:new FormControl(alimento?.grassiPolinsaturi,Validators.compose([this.numeroPositivoValidator])),
      myGrassiMonoinsaturi:new FormControl(alimento?.grassiMonoinsaturi,Validators.compose([this.numeroPositivoValidator])),
      myGrassiTrans:new FormControl(alimento?.grassiTrans,Validators.compose([this.numeroPositivoValidator])),
      myColesterolo:new FormControl(alimento?.colesterolo,Validators.compose([this.numeroPositivoValidator])),
      mySodio:new FormControl(alimento?.sodio,Validators.compose([this.numeroPositivoValidator])),
      myPotassio:new FormControl(alimento?.potassio,Validators.compose([this.numeroPositivoValidator])),
      myVitaminaA:new FormControl(alimento?.vitaminaA,Validators.compose([this.numeroPositivoValidator])),
      myVitaminaC:new FormControl(alimento?.vitaminaC,Validators.compose([this.numeroPositivoValidator])),
      myCalcio:new FormControl(alimento?.calcio,Validators.compose([this.numeroPositivoValidator])),
      myFerro:new FormControl(alimento?.ferro,Validators.compose([this.numeroPositivoValidator]))
    })
  }

  numeroPositivoValidator(control:any){
    if (control.value < 0) {
      return { 'numeroPositivo': true };
    }
    return null;
  };

  aggiungiAlimento(){
    const nuovoAlimento:Alimento = new ConcreteAlimento(
      this.form.get('myNome')?.value,
      this.form.get('myDescrizione')?.value,
      this.form.get('myEnergia')?.value,
      this.form.get('myProteine')?.value,
      this.form.get('myCarboidrati')?.value,
      this.form.get('myFibre')?.value,
      this.form.get('myZuccheri')?.value,
      this.form.get('myGrassiTotali')?.value,
      this.form.get('myGrassiSaturi')?.value,
      this.form.get('myGrassiPolinsaturi')?.value,
      this.form.get('myGrassiMonoinsaturi')?.value,
      this.form.get('myGrassiTrans')?.value,
      this.form.get('myColesterolo')?.value,
      this.form.get('mySodio')?.value,
      this.form.get('myVitaminaA')?.value,
      this.form.get('myVitaminaC')?.value,
      this.form.get('myCalcio')?.value,
      this.form.get('myFibre')?.value,
      this.form.get('myFerro')?.value
    )
    this.alimentoService.addAlimento(nuovoAlimento).subscribe({
      next:(data)=>{
        this.alimenti.push(data);
        this.modalRef.close();
      },
      error:err=>{
        if(err.status == 409)
          this.alimentoGiaInserito = true;
        else{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      }
    })
  }

  modificaAlimento(){
    if(this.idDaModificare && this.numDaModificare != null){
      const nuovoAlimento:Alimento = new ConcreteAlimento(
        this.form.get('myNome')?.value,
        this.form.get('myDescrizione')?.value,
        this.form.get('myEnergia')?.value,
        this.form.get('myProteine')?.value,
        this.form.get('myCarboidrati')?.value,
        this.form.get('myFibre')?.value,
        this.form.get('myZuccheri')?.value,
        this.form.get('myGrassiTotali')?.value,
        this.form.get('myGrassiSaturi')?.value,
        this.form.get('myGrassiPolinsaturi')?.value,
        this.form.get('myGrassiMonoinsaturi')?.value,
        this.form.get('myGrassiTrans')?.value,
        this.form.get('myColesterolo')?.value,
        this.form.get('mySodio')?.value,
        this.form.get('myVitaminaA')?.value,
        this.form.get('myVitaminaC')?.value,
        this.form.get('myCalcio')?.value,
        this.form.get('myFibre')?.value,
        this.form.get('myFerro')?.value
      )
      this.alimentoService.updateAlimento(this.idDaModificare,nuovoAlimento).subscribe({
        next:data=>{
          if(this.numDaModificare != null)
            this.alimenti.splice(this.numDaModificare,1);
          this.alimenti.push(data);
          this.modalRef.close();
        },
        error:err=>{
          if(err.status == 409)
            this.alimentoGiaInserito = true;
          else{
            alert('Sessione scaduta.\nEffetua nuovamente il login!');
            this.tokenService.signOut();
            window.location.reload();
          }
        }
      })
    }
  }

}
