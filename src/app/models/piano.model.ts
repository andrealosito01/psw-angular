export interface Piano{
  id?:number,
  nome:string,
  energia:number,
  proteine:number,
  carboidrati:number,
  fibre:number,
  zuccheri:number,
  grassiTotali:number,
  grassiSaturi:number,
  grassiPolinsaturi:number,
  grassiMonoinsaturi:number,
  grassiTrans:number,
  colesterolo:number,
  sodio:number,
  potassio:number,
  vitaminaA:number,
  vitaminaC:number,
  calcio:number,
  ferro:number
}

export class ConcretePiano implements Piano{

  public nome:string;
  public energia:number;
  public proteine:number;
  public carboidrati:number;
  public fibre:number;
  public zuccheri:number;
  public grassiTotali:number;
  public grassiSaturi:number;
  public grassiPolinsaturi:number;
  public grassiMonoinsaturi:number;
  public grassiTrans:number;
  public colesterolo:number;
  public sodio:number;
  public potassio:number;
  public vitaminaA:number;
  public vitaminaC:number;
  public calcio:number;
  public ferro:number;

  constructor (nome:string, energia:number, proteine:number, carboidrati:number, fibre:number, zuccheri:number,
    grassiTotali:number, grassiSaturi:number, grassiPolinsaturi:number, grassiMonoinsaturi:number, grassiTrans:number,
    colesterolo:number, sodio:number, potassio:number, vitaminaA:number, vitaminaC:number, calcio:number, ferro:number){
      this.nome = nome;
      this.energia = energia;
      this.proteine = proteine;
      this.carboidrati = carboidrati;
      this.fibre = fibre;
      this.zuccheri = zuccheri;
      this.grassiTotali = grassiTotali;
      this.grassiSaturi = grassiSaturi;
      this.grassiPolinsaturi = grassiPolinsaturi;
      this.grassiMonoinsaturi = grassiMonoinsaturi;
      this.grassiTrans = grassiTrans;
      this.colesterolo = colesterolo;
      this.sodio = sodio;
      this.potassio = potassio;
      this.vitaminaA = vitaminaA;
      this.vitaminaC = vitaminaC;
      this.calcio = calcio;
      this.ferro = ferro;
    }

}
