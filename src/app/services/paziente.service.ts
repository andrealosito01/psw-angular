import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Utente } from '../models/utente.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PazienteService {

  constructor(private http:HttpClient) { }

  public getPaziente():Observable<Utente>{
    return this.http.get(auth.UTENTE_API).pipe(
      map((data: any) => {
        const paziente = {
          username:data.username,
          email:data.email,
          nome:data.nome,
          cognome: data.cognome,
          dataDiNascita: data.dataDiNascita,
          altezza: data.altezza,
          piano: data.piano,
          pesi:data.pesi,
          passi:data.passi,
          misure:data.misure,
          alimenti:data.alimenti,
          diari: data.diari,
          schede: data.schede
        };
        return paziente;
      })
    );
  }

  public updatePaziente(utente:Utente):Observable<Utente>{
    return this.http.put(auth.UTENTE_API,utente,httpOptions).pipe(
      map((data:any)=>{
        const utenteAggiornato = data;
        return utenteAggiornato;
      })
    )
  }

}
