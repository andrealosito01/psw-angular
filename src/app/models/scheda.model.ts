import { Esercizio } from "./esercizio.model";

export interface Scheda{
  id?:number,
  nome:string,
  attiva:boolean,
  esercizi:Esercizio[]
}

export class ConcreteScheda implements Scheda{

  public nome:string;
  public attiva:boolean;
  public esercizi:Esercizio[] = [];

  constructor(nome:string, attiva:boolean = false){
    this.nome = nome;
    this.attiva = attiva;
  }

}
