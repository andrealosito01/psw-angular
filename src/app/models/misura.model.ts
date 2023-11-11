export interface Misura{
  data:number;
  braccioDx:number;
  braccioSx:number;
  torace:number;
  vita:number;
  fianchi:number;
  gambaDx:number;
  gambaSx:number;
}

export class ConcreteMisura implements Misura{

  public data:number;
  public braccioDx:number;
  public braccioSx:number;
  public torace:number;
  public vita:number;
  public fianchi:number;
  public gambaDx:number;
  public gambaSx:number;

  constructor(data:number, braccioDx:number, braccioSx:number, torace:number, vita:number, fianchi:number,
    gambaDx:number, gambaSx:number){
      this.data = data;
      this.braccioDx = braccioDx;
      this.braccioSx = braccioSx;
      this.torace = torace;
      this.vita = vita;
      this.fianchi = fianchi;
      this.gambaDx = gambaDx;
      this.gambaSx = gambaSx;
    }

}
