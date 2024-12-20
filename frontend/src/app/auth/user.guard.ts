import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isUser()) {
            return true;
        } else {
            this.authService.logout();
            this.router.navigate(['/home-inicio-registro']);
            return false;
        }
    }
}