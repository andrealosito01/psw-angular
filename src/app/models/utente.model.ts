export interface Utente{
  username:string,
  email:string,
  nome:string,
  cognome:string,
  dataDiNascita:number,
  altezza:number
}

export class ConcreteUtente implements Utente{

  public username:string;
  public password: string;
  public email:string;
  public nome:string;
  public cognome:string;
  public dataDiNascita: number;
  public altezza: number;

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
