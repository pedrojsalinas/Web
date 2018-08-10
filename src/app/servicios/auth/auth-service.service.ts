import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth,private router: Router){
    this.user = afAuth.authState;
  }

  loginCorreo(data){
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo,data.clave).then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  getUser(){
    let usuario = this.afAuth.auth.onAuthStateChanged;
  }
  loginAnonimo(){
    return this.afAuth.auth.signInAnonymously().then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  getAuth(){
      return this.afAuth.authState;
    }


  logout(){
    return this.afAuth.auth.signOut().then(()=>{
      console.log('sign out')
    });
  }
}
