import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { VoceDiario } from '../models/voce-diario.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class VoceDiarioService {

  constructor(private http:HttpClient) { }

  public addVoceDiario(idDiario:number,voce:VoceDiario):Observable<VoceDiario>{
    const url = auth.VOCE_DIARIO_API + "/" + idDiario;
    return this.http.post(url,voce,httpOptions).pipe(
      map((data:any)=>{
        const nuovaVoce:VoceDiario = data;
        return nuovaVoce;
      })
    )
  }

  public removeVoceDiario(idDiario:number,idVoce:number):Observable<VoceDiario>{
    const url = auth.VOCE_DIARIO_API + "/" + idDiario + "/" + idVoce;
    return this.http.delete(url).pipe(
      map((data:any)=>{
        const voceDiario:VoceDiario = data;
        return voceDiario;
      })
    )
  }

  public updateVoceDiario(idDiario:number,idVoce:number,voce:VoceDiario):Observable<VoceDiario>{
    const url = auth.VOCE_DIARIO_API + "/" + idDiario + "/" + idVoce;
    return this.http.put(url,voce,httpOptions).pipe(
      map((data:any)=>{
        const voceModificata:VoceDiario = data;
        return voceModificata;
      })
    )
  }

}
