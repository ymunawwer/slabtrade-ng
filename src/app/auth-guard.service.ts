import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if(this.authService.isAuthenticated()){
            return true;
        }else{
          
            this.router.navigate(['register']);
        }
    }

}

