import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private session: SessionService) { }

  public isSignedIn() {
    return !!this.session.accessToken; //checking... will turn false if not signed in 
  }

  public doSignOut() {
    this.session.destroy();
  }

  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }
    this.session.accessToken = accessToken;
    window.sessionStorage.setItem('token', accessToken) //Browser API
    this.session.name = name;
  }


}
