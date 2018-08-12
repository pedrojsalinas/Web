import { Component, OnInit } from '@angular/core';
import { Confesion } from '../../../clases/confesion';
import { ConfesionService } from '../../../servicios/confesion/confesion.service';
import { AuthServiceService } from '../../../servicios/auth/auth-service.service';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import {Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { LoginDialogComponent } from '../../../componentes/dialogs/login-dialog/login-dialog.component';


@Component({
  selector: 'app-agregar-confesion',
  templateUrl: './agregar-confesion.component.html',
  styleUrls: ['./agregar-confesion.component.scss']
})
export class AgregarConfesionComponent implements OnInit {
  confesionForm: FormGroup;
  myDate = new Date();
  public isLogin: boolean;


  constructor(
    private router: Router,
    private confesionService:ConfesionService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private authService:AuthServiceService) {
      this.onComprobarUserLogin();
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(()=>{
          let snackBarRef = this.snackBar.open('Usuario Logueado')
          }
        );
    }

  ngOnInit() {
    this.confesionForm = this.fb.group({
      titulo: ['',Validators.required],
      cuerpo:['', Validators.required ],
      categoria:['', Validators.required ],
    })
  }
  login(){
    this.openDialog();
  }
  addConfesion(){
    this.confesionService.addConfesion(this.confesionForm.value).then(()=>{
      this.router.navigate(['/']);
    })
  }
  onComprobarUserLogin(){
  this.authService.getAuth().subscribe( auth => {
    if(auth){
      this.isLogin=true;
    }else{
      this.isLogin= false;
      }
    })
  }
}
