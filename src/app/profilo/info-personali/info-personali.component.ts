import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Utente } from 'src/app/models/utente.model';
import { PazienteService } from 'src/app/services/paziente.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-info-personali',
  templateUrl: './info-personali.component.html',
  styleUrls: ['./info-personali.component.css']
})
export class InfoPersonaliComponent {

  @Input() paziente!:Utente;
  formInfoPersonali!:FormGroup;

  isInfoUpdateSuccessful:boolean = false;

  constructor(private tokenService:TokenStorageService, private pazienteService:PazienteService){}

  ngOnInit(){
    this.inizializzaFormInfoPersonali();
  }

  inizializzaFormInfoPersonali(){
    const dataDiNascitaFormattata = format(new Date(this.paziente.dataDiNascita),'yyyy-MM-dd');
    this.formInfoPersonali = new FormGroup({
      myNome:new FormControl(this.paziente.nome,Validators.compose([Validators.maxLength(16),Validators.required])),
      myCognome:new FormControl(this.paziente.cognome,Validators.compose([Validators.maxLength(16),Validators.required])),
      myNascita:new FormControl(dataDiNascitaFormattata,Validators.compose([Validators.required])),
      myAltezza:new FormControl(this.paziente.altezza,this.numeroPositivoValidator)
    })
  }

  numeroPositivoValidator(control:any){
    if (control.value < 0) {
      return { 'numeroPositivo': true };
    }
    return null;
  };

  onSubmit(){
    if(this.formModificato() && this.formInfoPersonali.valid){
      const pazienteAggiornato = {...this.paziente};
      pazienteAggiornato.id = undefined;
      pazienteAggiornato.nome = this.formInfoPersonali.get('myNome')?.value;
      pazienteAggiornato.cognome = this.formInfoPersonali.get('myCognome')?.value;
      pazienteAggiornato.dataDiNascita = this.formInfoPersonali.get('myNascita')?.value;
      pazienteAggiornato.altezza = this.formInfoPersonali.get('myAltezza')?.value;
      this.pazienteService.updatePaziente(pazienteAggiornato).subscribe({
        next:data=>{
          this.paziente = data;
          this.isInfoUpdateSuccessful = true;
          setTimeout(() => {
            this.isInfoUpdateSuccessful = false;
          }, 5000);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
    }
  }

  formModificato():boolean{
    if(this.formInfoPersonali)
      return (this.formInfoPersonali.get('myNome')?.value != this.paziente.nome)
      || (this.formInfoPersonali.get('myCognome')?.value != this.paziente.cognome)
      || (this.formInfoPersonali.get('myNascita')?.value != format(new Date(this.paziente.dataDiNascita),'yyyy-MM-dd'))
      || (this.formInfoPersonali.get('myAltezza')?.value != this.paziente.altezza);
    else
      return false;
  }

}
