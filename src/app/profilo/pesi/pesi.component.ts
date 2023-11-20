import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { ConcretePeso, Peso } from 'src/app/models/peso.model';
import { PesoService } from 'src/app/services/peso.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-pesi',
  templateUrl: './pesi.component.html',
  styleUrls: ['./pesi.component.css']
})
export class PesiComponent {

  private modalRef!:NgbModalRef;

  pesi!:Peso[];
  pagine!:number[];
  paginaAttuale!:number;
  isFirst!:boolean;
  isLast!:boolean;
  form!:FormGroup;

  pesoGiaInserito:boolean = false;

  constructor(private tokenService:TokenStorageService, private pesoService:PesoService, private modalService:NgbModal){}

  ngOnInit(){
    this.getPesi(0);
  }

  getPesi(pagina:number){
    if(pagina == 0 || pagina > 0 && pagina<this.pagine.length)
      this.pesoService.getPesi(pagina,7).subscribe({
        next:data=>{
          this.pesi = data.content;
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

  chiediConfermaRimozione(peso:Peso): void {
    const conferma = window.confirm('Sei sicuro di voler rimuovere questo peso?');
    if(conferma)
      this.eliminaPeso(peso);
  }

  eliminaPeso(peso:Peso){
    if(peso.id)
      this.pesoService.deletePeso(peso.id).subscribe({
        next:data=>{
          if(this.isLast && this.pesi.length == 1)
            if(this.isFirst)
              this.pesi = [];
            else
              this.getPesi(this.paginaAttuale-1);
          else
            this.getPesi(this.paginaAttuale);
        },
        error:err=>{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      })
  }

  open(content: TemplateRef<any>) {
    this.inizializzaForm();
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
			(result) => {
        this.pesoGiaInserito = false;
        this.getPesi(this.paginaAttuale);
			},
			(reason) => {
        this.pesoGiaInserito = false;
			},
		);
	}

  inizializzaForm(){
    const dataFormattata = format(new Date().setHours(0,0,0,0),'yyyy-MM-dd');
    this.form = new FormGroup({
      myData:new FormControl(dataFormattata,Validators.required),
      myValore:new FormControl('',Validators.compose([Validators.required,this.numeroPositivoValidator]))
    })
  }

  numeroPositivoValidator(control:any){
    if (control.value < 0) {
      return { 'numeroPositivo': true };
    }
    return null;
  };

  aggiungiPeso(){
    const nuovoPeso:Peso = new ConcretePeso(
      this.form.get('myData')?.value,
      this.form.get('myValore')?.value
    )
    this.pesoService.addPeso(nuovoPeso).subscribe({
      next:(data)=>{
        this.modalRef.close();
      },
      error:err=>{
        if(err.status == 409)
          this.pesoGiaInserito = true;
        else{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      }
    })
  }

}
