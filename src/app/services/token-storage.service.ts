import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map, of, catchError} from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESH_TOKEN_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService:AuthService) { }

  signOut():void{
    window.sessionStorage.clear();
  }

  public saveToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
    const decodedToken = TokenStorageService.decodeToken(token);
    this.saveUser(decodedToken);
  }

  public getToken():Observable<string>{
    return new Observable<string>(observable=>{
      const token = window.sessionStorage.getItem(TOKEN_KEY);
      const refreshToken = this.getRefreshToken();
      if(token && TokenStorageService.isValid(token)){
        observable.next(token);
        observable.complete();
      }else if(refreshToken && TokenStorageService.isValid(refreshToken)){
        this.saveRefreshToken(null);  // se non facessi così entrerei in un loop (vedasi interceptor)
        this.authService.refresh(refreshToken).subscribe({
          next:data=>{
            this.saveToken(data.access_token);
            this.saveRefreshToken(data.refresh_token);
            observable.next(data.access_token);
            observable.complete();
          },
          error:err=>{
            observable.next('');
            observable.complete();
          }
        })
      }else{
        observable.next('');
        observable.complete();
      }
    })
  }

  private saveUser(user:any):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user)
      return JSON.parse(user);
    return null;
  }

  public saveRefreshToken(token:string|null):void{
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    if(token)
      window.sessionStorage.setItem(REFRESH_TOKEN_KEY,token);
  }

  private getRefreshToken():string|null{
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public refreshToken():Observable<boolean>{
    return new Observable<boolean>((observer) => {
      const refreshToken = this.getRefreshToken();
      if(refreshToken){
        this.authService.refresh(refreshToken).subscribe({
          next:data=>{
            this.saveToken(data.access_token);
            this.saveRefreshToken(data.refresh_token);
            observer.next(true);
            observer.complete();
          },
          error:err=>{
            observer.next(false);
            observer.complete();
          },
        });
      }else{
        observer.next(false);
        observer.complete();
      }
    });
  }

  public static isValid(token:string|null):boolean{
    if(token == null) return false;
    const decodedToken = this.decodeToken(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp <= decodedToken.exp;
  }

  public static decodeToken(token:string):any{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

}
