import { VoceDiario } from "./voce-diario.model";

export interface Diario{
  id?:number,
  giorno:number,
  acqua:number,
  vociDiario:VoceDiario[]
}

export class ConcreteDiario implements Diario{

  public giorno:number;
  public acqua:number;
  public vociDiario: VoceDiario[] = [];

  constructor(giorno:number, acqua:number){
    this.giorno = giorno;
    this.acqua = acqua;
  }

}
