import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;
  isLoginFailed = false;
  errorMessage = "";
  submitted = false;

  constructor(private authService:AuthService, private tokenStorage:TokenStorageService){
    this.form = new FormGroup({
      myUsername:new FormControl('',Validators.compose([Validators.maxLength(20),Validators.required])),
      myPassword:new FormControl('',Validators.compose([Validators.required]))
    })
  }

  ngOnInit():void{}

  onSubmit():void{

    this.submitted = true;

    if(!this.form.valid) return;

    const username = this.form.get('myUsername')?.value as string;
    const password = this.form.get('myPassword')?.value as string;

    this.authService.login(username,password).subscribe({
      next:data=>{
        const decodedToken = this.decodeToken(data.access_token);
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(decodedToken);
        this.isLoginFailed = false;
        window.location.reload();
      },
      error:err=>{
        if(err.status == 401)
          this.errorMessage = 'Credenziali errate!';
        else
          this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    })
  }

  private decodeToken(token:string):any{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

}
