import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { ConcretePassi, Passi } from 'src/app/models/passi.model';
import { PassiService } from 'src/app/services/passi.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-passi',
  templateUrl: './passi.component.html',
  styleUrls: ['./passi.component.css']
})
export class PassiComponent {

  private modalRef!:NgbModalRef;

  passi!:Passi[];
  pagine!:number[];
  paginaAttuale!:number;
  isFirst!:boolean;
  isLast!:boolean;
  form!:FormGroup;

  passiGiaInseriti:boolean = false;

  constructor(private tokenService:TokenStorageService, private passiService:PassiService, private modalService:NgbModal){}

  ngOnInit(){
    this.getPassi(0);
  }

  getPassi(pagina:number){
    if(pagina == 0 || pagina > 0 && pagina<this.pagine.length)
      this.passiService.getPassi(pagina,7).subscribe({
        next:data=>{
          this.passi = data.content;
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

  chiediConfermaRimozione(passi:Passi): void {
    const conferma = window.confirm('Sei sicuro di voler rimuovere questi passi?');
    if(conferma)
      this.eliminaPassi(passi);
  }

  eliminaPassi(passi:Passi){
    if(passi.id)
      this.passiService.deletePassi(passi.id).subscribe({
        next:data=>{
          if(this.isLast && this.passi.length == 1)
            if(this.isFirst)
              this.passi = [];
            else
              this.getPassi(this.paginaAttuale-1);
          else
            this.getPassi(this.paginaAttuale);
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
        this.passiGiaInseriti = false;
        this.getPassi(this.paginaAttuale);
			},
			(reason) => {
        this.passiGiaInseriti = false;
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

  aggiungiPassi(){
    const nuoviPassi:Passi = new ConcretePassi(
      this.form.get('myData')?.value,
      this.form.get('myValore')?.value
    )
    this.passiService.addPassi(nuoviPassi).subscribe({
      next:(data)=>{
        this.modalRef.close();
      },
      error:err=>{
        if(err.status == 409)
          this.passiGiaInseriti = true;
        else{
          alert('Sessione scaduta.\nEffetua nuovamente il login!');
          this.tokenService.signOut();
          window.location.reload();
        }
      }
    })
  }

}
