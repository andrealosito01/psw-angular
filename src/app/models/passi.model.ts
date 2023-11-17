export interface Passi{
  id?:number,
  data:number,
  valore:number
}

export class ConcretePassi implements Passi{

  public data:number;
  public valore:number;

  constructor(data:number, valore:number){
    this.data = data;
    this.valore = valore;
  }

}
