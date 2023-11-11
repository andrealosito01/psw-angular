export interface Serie{
  numero:number,
  ripetizioni:number,
  carico:number,
  durata:number
}

export class ConcreteSerie implements Serie{

  public numero:number;
  public ripetizioni: number;
  public carico:number;
  public durata:number;

  constructor(numero:number, ripetizioni:number, carico:number, durata:number){
    this.numero = numero;
    this.ripetizioni = ripetizioni;
    this.carico = carico;
    this.durata = durata;
  }

}
