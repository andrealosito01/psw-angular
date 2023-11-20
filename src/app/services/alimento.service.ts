import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Alimento, ConcreteAlimento } from '../models/alimento.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AlimentoService {

  constructor(private httpClient:HttpClient) {}

  public getAlimenti():Observable<Alimento[]>{
    return this.httpClient.get(auth.ALIMENTO_API).pipe(
      map((data:any)=>{
        const alimenti:Alimento[] = data;
        return alimenti;
      })
    );
  }

  public getAlimentiNutrizionista():Observable<Alimento[]>{
    const url = auth.ALIMENTO_API + "/nutrizionista";
    return this.httpClient.get(url).pipe(
      map((data:any)=>{
        const alimenti:Alimento[] = data;
        return alimenti;
      })
    )
  }

  public getAlimentoByBarCode(barCode:string):Observable<Alimento>{
    const url = auth.OPEN_FOOD_API + "/" + barCode + ".json";
    return this.httpClient.get(url).pipe(
      map((data:any)=>{
        const porzione = data.product_quantity;
        let nome = data.product.product_name_it;
        if(!nome)
          nome = data.product.product_name;
        let descrizione = data.product.brand_owner;
        if(!descrizione)
          descrizione = data.product.brands;
        let energia = parseFloat((data.product.nutriments['energy-kcal_100g']).toFixed(0));
        if(!energia)
          energia = parseFloat((data.product.nutriments['energy-kcal']*100/porzione).toFixed(0));
        let proteine = parseFloat((data.product.nutriments.proteins_100g).toFixed(1));
        if(!proteine)
          proteine = parseFloat((data.product.nutriments.proteins*100/porzione).toFixed(1));
        let carboidrati = parseFloat((data.product.nutriments.carbohydrates_100g).toFixed(1));
        if(!carboidrati)
          carboidrati = parseFloat((data.product.nutriments.carbohydrates*100/porzione).toFixed(1));
        let fibre = parseFloat((data.product.nutriments.fiber_100g)?.toFixed(1));
        if(!fibre)
          fibre = parseFloat((data.product.nutriments.fiber*100/porzione)?.toFixed(1));
        let zuccheri = parseFloat((data.product.nutriments.sugars_100g)?.toFixed(1));
        if(!zuccheri)
          zuccheri = parseFloat((data.product.nutriments.sugars*100/porzione)?.toFixed(1));
        let grassiTotali = parseFloat((data.product.nutriments.fat_100g).toFixed(1));
        if(!grassiTotali)
          grassiTotali = parseFloat((data.product.nutriments.fat*100/porzione).toFixed(1));
        let grassiSaturi = parseFloat((data.product.nutriments['saturated-fat_100g'])?.toFixed(1));
        if(!grassiSaturi)
          grassiSaturi = parseFloat((data.product.nutriments['saturated-fat']*100/porzione)?.toFixed(1));
        let grassiPolinsaturi = parseFloat((data.product.nutriments['polyunsaturated-fat_100g'])?.toFixed(1));
        if(!grassiPolinsaturi)
          grassiPolinsaturi = parseFloat((data.product.nutriments['polyunsaturated-fat']*100/porzione)?.toFixed(1));
        let grassiMonoinsaturi = parseFloat((data.product.nutriments['monounsaturated-fat_100g'])?.toFixed(1));
        if(!grassiMonoinsaturi)
          grassiMonoinsaturi = parseFloat((data.product.nutriments['monounsaturated-fat']*100/porzione)?.toFixed(1));
        let grassiTrans = parseFloat((data.product.nutriments['trans-fat_100g'])?.toFixed(1));
        if(!grassiTrans)
          grassiTrans = parseFloat((data.product.nutriments['trans-fat']*100/porzione)?.toFixed(1));
        let colesterolo = parseFloat((1000*data.product.nutriments.cholesterol_100g)?.toFixed(0));
        if(!colesterolo)
          colesterolo = parseFloat((1000*data.product.nutriments.cholesterol*100/porzione)?.toFixed(0));
        let sodio = parseFloat((1000*data.product.nutriments.sodium_100g)?.toFixed(0));
        if(!sodio)
          sodio = parseFloat((1000*data.product.nutriments.sodium*100/porzione)?.toFixed(0));
        let potassio = parseFloat((1000*data.product.nutriments.potassium_100g)?.toFixed(0));
        if(!potassio)
          potassio = parseFloat((1000*data.product.nutriments.potassium*100/porzione)?.toFixed(0));
        let vitaminaA = parseFloat((1000000*data.product.nutriments['vitamin-a_100g'])?.toFixed(0));
        if(!vitaminaA)
          vitaminaA = parseFloat((1000000*data.product.nutriments['vitamin-a']*100/porzione)?.toFixed(0));
        let vitaminaC = parseFloat((1000*data.product.nutriments['vitamin-c_100g'])?.toFixed(0));
        if(!vitaminaC)
          vitaminaC = parseFloat((1000*data.product.nutriments['vitamin-c']*100/porzione)?.toFixed(0));
        let calcio = parseFloat((1000*data.product.nutriments.calcium_100g)?.toFixed(0));
        if(!calcio)
          calcio = parseFloat((1000*data.product.nutriments.calcium*100/porzione)?.toFixed(0));
        let ferro = parseFloat((1000*data.product.nutriments.iron_100g)?.toFixed(0));
        if(!ferro)
          ferro = parseFloat((1000*data.product.nutriments.iron*100/porzione)?.toFixed(0));


        return new ConcreteAlimento(
          nome,
          descrizione,
          energia,
          proteine,
          carboidrati,
          fibre,
          zuccheri,
          grassiTotali,
          grassiSaturi,
          grassiPolinsaturi,
          grassiMonoinsaturi,
          grassiTrans,
          colesterolo,
          sodio,
          potassio,
          vitaminaA,
          vitaminaC,
          calcio,
          ferro
        )
      })
    );
  }

  deleteAlimento(id:number):Observable<Alimento>{
    const url = auth.ALIMENTO_API + "/" + id;
    return this.httpClient.delete(url).pipe(
      map((data:any)=>{
        const alimento:Alimento = data;
        return alimento;
      })
    )
  }

  addAlimento(alimento:Alimento):Observable<Alimento>{
    return this.httpClient.post(auth.ALIMENTO_API,alimento,httpOptions).pipe(
      map((data:any)=>{
        const alimento:Alimento = data;
        return alimento;
      })
    )
  }

  updateAlimento(id:number,alimento:Alimento):Observable<Alimento>{
    const url = auth.ALIMENTO_API + "/" + id;
    return this.httpClient.put(url,alimento,httpOptions).pipe(
      map((data:any)=>{
        const alimento:Alimento = data;
        return alimento;
      })
    )
  }

}
