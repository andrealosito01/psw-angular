import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConcreteUtente } from '../models/utente.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form:FormGroup;
  isSignUpFailed = false;
  errorMessage = "";
  submitted = false;
  missMatch = false;

  constructor(private authService:AuthService, private router:Router){
    this.form = new FormGroup({
      myUsername:new FormControl('',Validators.compose([Validators.minLength(5),Validators.maxLength(20),Validators.required])),
      myEmail:new FormControl('',Validators.compose([Validators.email, Validators.required])),
      myNome:new FormControl('',Validators.compose([Validators.maxLength(16),Validators.required])),
      myCognome:new FormControl('',Validators.compose([Validators.maxLength(16),Validators.required])),
      myNascita:new FormControl('',Validators.compose([Validators.required])),
      myAltezza:new FormControl(),
      myPassword:new FormControl('',Validators.compose([Validators.minLength(8),Validators.required])),
      myRePassword:new FormControl('',Validators.compose([Validators.minLength(8),Validators.required]))
    })
  }

  private checkMatching():boolean{
    const password = this.form.get('myPassword')?.value;
    const rePassword = this.form.get('myRePassword')?.value;
    return password == rePassword;
  }

  ngOnInit():void{
    this.form.get('myPassword')?.valueChanges.subscribe(()=>{
      this.missMatch = !this.checkMatching();
    })

    this.form.get('myRePassword')?.valueChanges.subscribe(()=>{
      this.missMatch = !this.checkMatching();
    })
  }

  onSubmit():void{

    this.submitted = true;

    if(!this.form.valid) return;
    if(this.missMatch) return;

    const nuovoPaziente = new ConcreteUtente(
      this.form.value.myUsername,
      this.form.value.myPassword,
      this.form.value.myEmail,
      this.form.value.myNome,
      this.form.value.myCognome,
      this.form.value.myNascita,
      this.form.value.myAltezza
    );

    this.authService.signup(nuovoPaziente).subscribe({
      next:data=>{
        this.router.navigate(['/login'],{queryParams:{signed:'true'}});
      },
      error:err=>{
        if(err.status == 409)
          this.errorMessage = err.error.message;
        else
          this.errorMessage = "Errore generico, contatta l'amministratore dell'app"
        this.isSignUpFailed = true;
      }
    })
  }

}
