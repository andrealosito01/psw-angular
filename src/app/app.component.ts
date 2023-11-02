import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private tokenService:TokenStorageService, private router:Router){ }

  ngOnInit(){
    const user = this.tokenService.getUser();
    if(user){
      const roles = user.resource_access.myclient.roles;
      if(roles.includes('paziente'))
        this.router.navigateByUrl("/paziente");
      else if(roles.includes('nutrizionista')){
        this.router.navigateByUrl("/nutrizionista");
      }
    }else{
      this.router.navigateByUrl("/login");
    }
  }

}
