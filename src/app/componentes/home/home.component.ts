import { Component, OnInit } from '@angular/core';
import { ConfesionService } from '../../servicios/confesion/confesion.service';
import {Confesion} from '../../clases/confesion';
import { Observable } from 'rxjs';
import {Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  confesiones: Observable<Confesion [] >;
  confesion: Observable<Confesion>;
  constructor(private router: Router,private confesionService: ConfesionService) {
    this.confesiones= this.confesionService.getConfesiones()
  }

  ngOnInit() {
  }
  funcion(confesion){
    this.confesion =this.confesionService.getConfesion(confesion.key)
    this.confesion.subscribe(data=>{
      this.router.navigate(['detalle/'+confesion.key]);
    })

  }
}
