export interface Peso{
  data:number,
  valore:number
}

export class ConcretePeso implements Peso{

  public data:number;
  public valore:number;

  constructor (data:number, valore:number){
    this.data = data;
    this.valore = valore;
  }

}
