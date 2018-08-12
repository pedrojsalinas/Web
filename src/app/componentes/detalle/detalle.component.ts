import { Component, OnInit } from '@angular/core';
import { Confesion } from '../../clases/confesion';
import { Comentario } from '../../clases/comentario';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfesionService } from '../../servicios/confesion/confesion.service';
import { ComentarioService } from '../../servicios/comentario/comentario.service';
import { AuthServiceService } from '../../servicios/auth/auth-service.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatSnackBar} from '@angular/material';
import { LoginDialogComponent } from './../../componentes/dialogs/login-dialog/login-dialog.component';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  private  uidConfesion;
  private  uid;
  public isLogin: boolean;

  comentarioForm: FormGroup;
  confesion: Confesion;
  comentario:Comentario={
    cuerpo:'',
    usuario_uid:'',
    fecha:null,
    confesion_uid:'',
  };
  comentarios: Observable<Comentario [] >;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confesionService: ConfesionService,
    private comentarioService: ComentarioService,
    private authService: AuthServiceService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fb: FormBuilder) {
      this.uid = this.route.snapshot.paramMap.get('uid');
      this.comentarios=comentarioService.getComentarios(this.uid);
      this.onComprobarUserLogin();
    }
  ngOnInit() {
    this.confesionService.getConfesion(this.uid).subscribe(data=>{
      this.confesion =data
    })
    this.comentarioForm = this.fb.group({
      cuerpo:['', Validators.required ],
    })
  }
  addComentario(){
    this.comentario.cuerpo = this.comentarioForm.value.cuerpo;
    this.authService.getAuth().subscribe( user => {
      this.comentario.usuario_uid =user.uid;
      this.comentario.confesion_uid=this.uid
      this.comentarioService.addComentario(this.comentario).then(()=>{
       console.log('Comentario agregado')
       })
    });
  }
  openDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(()=>{

        let snackBarRef = this.snackBar.open('Usuario Logueado')
      }
       // data => console.log("Dialog output:", data)
      );
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
  login(){
    this.openDialog();
  }
}
