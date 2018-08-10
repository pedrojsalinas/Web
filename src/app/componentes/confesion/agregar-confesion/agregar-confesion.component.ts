import { Component, OnInit } from '@angular/core';
import { Confesion } from '../../../clases/confesion';
import { ConfesionService } from '../../../servicios/confesion/confesion.service';
import { AuthServiceService } from '../../../servicios/auth/auth-service.service';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'app-agregar-confesion',
  templateUrl: './agregar-confesion.component.html',
  styleUrls: ['./agregar-confesion.component.scss']
})
export class AgregarConfesionComponent implements OnInit {
  confesionForm: FormGroup;
  myDate = new Date();

  constructor(
    private router: Router,
    private confesionService:ConfesionService,
    private fb: FormBuilder,
    private authService:AuthServiceService) { }

  ngOnInit() {
    this.confesionForm = this.fb.group({
      titulo: ['',Validators.required],
      cuerpo:['', Validators.required ],
      categoria:['', Validators.required ],
    })
  }
  addConfesion(){
    this.confesionService.addConfesion(this.confesionForm.value).then(()=>{
      this.router.navigate(['/']);
    })
  }

}
