import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../servicios/auth/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public userNombre : string;
  // public userEmail: string;
  // public userPicture: string;
  public userId: string;
  public isLogin: boolean;
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
     this.onComprobarUserLogin();
  }
  logout(){
    this.authService.logout();
  }
  onComprobarUserLogin(){
  this.authService.getAuth().subscribe( auth => {
    if(auth){
      this.isLogin=true;
      this.userNombre = auth.displayName;
      // this.userEmail = auth.email;
      // this.userPicture = auth.photoURL;
      this.userId = auth.uid;
    }else{
      this.isLogin= false;
    }
  })
}
}
