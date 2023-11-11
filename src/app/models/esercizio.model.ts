import { Serie } from "./serie.model";

export interface Esercizio{
  nome:string,
  descrizione:string,
  serie:Serie[]
}

export class ConcreteEsercizio implements Esercizio{

  public nome:string;
  public descrizione:string;
  public serie:Serie[] = [];

  constructor(nome:string, descrizione:string){
    this.nome = nome;
    this.descrizione = descrizione;
  }

}
