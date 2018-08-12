import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthServiceService } from '../../../servicios/auth/auth-service.service';



@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  mensaje:string;

  constructor(private authService:AuthServiceService,private dialogRef: MatDialogRef<LoginDialogComponent>,private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave:['', Validators.required ],
    })
  }
  close() {
    this.dialogRef.close();
  }
  login(){
    this.authService.loginCorreoDialog(this.loginForm.value).then(value => {
      this.dialogRef.close();
      }).catch(err => {
          this.mensaje =err.message;
        });
  }
  loginAnonimo(){
    this.authService.loginAnonimoDialog().then(value => {
      this.dialogRef.close();
      }).catch(err => {
          this.mensaje =err.message;
        });
  }
}
