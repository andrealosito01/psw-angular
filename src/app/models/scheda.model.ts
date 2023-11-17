import { Esercizio } from "./esercizio.model";

export interface Scheda{
  id?:number,
  nome:string,
  descrizione:string,
  attiva:boolean,
  esercizi:Esercizio[]
}

export class ConcreteScheda implements Scheda{

  public nome:string;
  public descrizione:string;
  public attiva:boolean;
  public esercizi:Esercizio[] = [];

  constructor(nome:string, descrizione:string, attiva:boolean = false){
    this.nome = nome;
    this.descrizione = descrizione;
    this.attiva = attiva;
  }

}
