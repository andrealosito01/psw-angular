import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConcretePiano, Piano } from '../../models/piano.model';
import { VoceDiario } from '../../models/voce-diario.model';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent {

  closeResult = '';
  @Input() piano!:Piano;
  @Input() vociDiario!:VoceDiario[];
  @Output() chiudi = new EventEmitter<any>();

  totali!:Piano;

	constructor(private modalService: NgbModal) {}

  ngOnInit(){
  }

  ngOnChanges(){
    this.inizializza();
    this.calcolaTotali();
  }

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  inizializza():void{
    this.totali = new ConcretePiano("",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  }

  calcolaTotali():void{
    for(let voce of this.vociDiario){
      this.totali.energia += voce.energia;
      this.totali.proteine += voce.proteine;
      this.totali.carboidrati += voce.carboidrati;
      this.totali.fibre += voce.fibre;
      this.totali.zuccheri += voce.zuccheri;
      this.totali.grassiTotali += voce.grassiTotali;
      this.totali.grassiSaturi += voce.grassiSaturi;
      this.totali.grassiPolinsaturi += voce.grassiPolinsaturi;
      this.totali.grassiMonoinsaturi += voce.grassiMonoinsaturi;
      this.totali.grassiTrans += voce.grassiTrans;
      this.totali.colesterolo += voce.colesterolo;
      this.totali.sodio += voce.sodio;
      this.totali.potassio += voce.potassio;
      this.totali.vitaminaA += voce.vitaminaA;
      this.totali.vitaminaC += voce.vitaminaC;
      this.totali.calcio += voce.calcio;
      this.totali.ferro += voce.ferro;
    }
  }

}
