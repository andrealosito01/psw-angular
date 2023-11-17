import { Alimento } from "./alimento.model";
import { Misura } from "./misura.model";
import { Passi } from "./passi.model";
import { Peso } from "./peso.model";
import { Piano } from "./piano.model";
import { Scheda } from "./scheda.model";

export interface Utente{
  id?:number,
  username:string,
  email:string,
  nome:string,
  cognome:string,
  dataDiNascita:number,
  altezza:number,
  piano?:Piano,
  pesi:Peso[],
  passi:Passi[],
  misure:Misura[],
  alimenti:Alimento[],
  schede:Scheda[]
}

export class ConcreteUtente implements Utente{

  public username:string;
  public password: string;
  public email:string;
  public nome:string;
  public cognome:string;
  public dataDiNascita: number;
  public altezza:number;
  public pesi:Peso[] = [];
  public passi:Passi[] = [];
  public misure:Misura[] = [];
  public alimenti:Alimento[] = [];
  public schede:Scheda[] = [];

  constructor(username:string, password:string, email:string, nome:string, cognome:string, dataDiNascita:number, altezza:number){
    this.username = username;
    this.password = password;
    this.email = email;
    this.nome = nome;
    this.cognome = cognome;
    this.dataDiNascita = dataDiNascita;
    this.altezza = altezza;
  }

}
