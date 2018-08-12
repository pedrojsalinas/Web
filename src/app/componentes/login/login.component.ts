import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../servicios/auth/auth-service.service';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import {Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,private authService:AuthServiceService,private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['',Validators.required],
      clave:['', Validators.required ],
    })
  }
  login(){
    this.authService.loginCorreo(this.loginForm.value);
  }
  loginAnonimo(){
    this.authService.loginAnonimo();
  }

}
