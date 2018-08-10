import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
// servicios
import { AuthServiceService } from './servicios/auth/auth-service.service';
import { ConfesionService } from './servicios/confesion/confesion.service';
import { ComentarioService } from './servicios/comentario/comentario.service';
//componentes
import { LoginComponent } from './componentes/login/login.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { AgregarConfesionComponent } from './componentes/confesion/agregar-confesion/agregar-confesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    AdminComponent,
    AgregarConfesionComponent,
    HomeComponent,
    PageNotFoundComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService,ConfesionService,ComentarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
