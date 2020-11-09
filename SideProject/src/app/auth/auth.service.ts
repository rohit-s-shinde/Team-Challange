import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    // checks whether user is logged in or not
    loggedIn(): boolean {
        if (sessionStorage.getItem('contactNo')) {
            return true;
        }
        return false;
    }
}
