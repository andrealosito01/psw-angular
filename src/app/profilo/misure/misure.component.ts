import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { ConcreteMisura, Misura } from 'src/app/models/misura.model';
import { MisuraService } from 'src/app/services/misura.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-misure',
  templateUrl: './misure.component.html',
  styleUrls: ['./misure.component.css']
})

export class MisureComponent {

  private modalRef!:NgbModalRef;

  misure!:Misura[];
  pagine!:number[];
  paginaAttuale!:number;
  isFirst!:boolean;
  isLast!:boolean;
  form!:FormGroup;

  misuraGiaInserita:boolean = false;
  idDaModificare?:number;

  constructor(private tokenService:TokenStorageService, private misuraService:MisuraService, private modalService:NgbModal){}

  ngOnInit(){
    this.getMisure(0);
  }

  getMisure(pagina:number){
    if(pagina == 0 || pagina > 0 && pagina<this.pagine.length)
      this.misuraService.getMisure(pagina,7).subscribe({
        next:data=>{
          this.misure = data.content;
          this.paginaAttuale = data.number;
          this.pagine = Array.from({ length: data.totalPages }, (_, index) => index + 1);
          this.isFirst = data.first;
          this.isLast = data.last;
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
  }

  formattaData(data:number){
    return format(new Date(data),'dd/MM/yyyy');
  }

  chiediConfermaRimozione(misura:Misura): void {
    const conferma = window.confirm('Sei sicuro di voler rimuovere questa misura?');
    if(conferma)
      this.eliminaMisura(misura);
  }

  eliminaMisura(misura:Misura){
    if(misura.id)
      this.misuraService.deleteMisura(misura.id).subscribe({
        next:data=>{
          if(this.isLast && this.misure.length == 1)
            if(this.isFirst)
              this.misure = [];
            else
              this.getMisure(this.paginaAttuale-1);
          else
            this.getMisure(this.paginaAttuale);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
  }

  open(content: TemplateRef<any>, misura?:Misura) {
    this.inizializzaForm(misura);
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
			(result) => {
        this.misuraGiaInserita = false;
        this.idDaModificare = undefined;
        this.getMisure(this.paginaAttuale);
			},
			(reason) => {
        this.misuraGiaInserita = false;
        this.idDaModificare = undefined;
			},
		);
	}

  inizializzaForm(misura?:Misura){
    let dataFormattata:string;
    if(!misura)
      dataFormattata = format(new Date().setHours(0,0,0,0),'yyyy-MM-dd');
    else{
      dataFormattata = format(new Date(misura.data).setHours(0,0,0,0),'yyyy-MM-dd');
      this.idDaModificare = misura.id;
    }

    this.form = new FormGroup({
      myData:new FormControl(dataFormattata,Validators.required),
      myBraccioDx:new FormControl(misura?.braccioDx,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myBraccioSx:new FormControl(misura?.braccioSx,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myTorace:new FormControl(misura?.torace,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myVita:new FormControl(misura?.vita,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myFianchi:new FormControl(misura?.fianchi,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myGambaDx:new FormControl(misura?.gambaDx,Validators.compose([Validators.required,this.numeroPositivoValidator])),
      myGambaSx:new FormControl(misura?.gambaSx,Validators.compose([Validators.required,this.numeroPositivoValidator]))
    })
  }

  numeroPositivoValidator(control:any){
    if (control.value < 0) {
      return { 'numeroPositivo': true };
    }
    return null;
  };

  aggiungiMisura(){
    const nuovaMisura:Misura = new ConcreteMisura(
      this.form.get('myData')?.value,
      this.form.get('myBraccioDx')?.value,
      this.form.get('myBraccioSx')?.value,
      this.form.get('myTorace')?.value,
      this.form.get('myVita')?.value,
      this.form.get('myFianchi')?.value,
      this.form.get('myGambaDx')?.value,
      this.form.get('myGambaSx')?.value,
    )
    this.misuraService.addMisura(nuovaMisura).subscribe({
      next:(data)=>{
        this.modalRef.close();
      },
      error:err=>{
        if(err.status == 409)
          this.misuraGiaInserita = true;
        else{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      }
    })
  }

  modificaMisura(){
    if(this.idDaModificare){
      const nuovaMisura:Misura = new ConcreteMisura(
        this.form.get('myData')?.value,
        this.form.get('myBraccioDx')?.value,
        this.form.get('myBraccioSx')?.value,
        this.form.get('myTorace')?.value,
        this.form.get('myVita')?.value,
        this.form.get('myFianchi')?.value,
        this.form.get('myGambaDx')?.value,
        this.form.get('myGambaSx')?.value,
      )
      this.misuraService.updateMisura(this.idDaModificare,nuovaMisura).subscribe({
        next:(data)=>{
          this.modalRef.close();
        },
        error:err=>{
          if(err.status == 409)
            this.misuraGiaInserita = true;
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
