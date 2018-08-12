import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Comentario } from '../../clases/comentario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  myDate = new Date();
  comentarios: Observable<any[]>;

  constructor(private db: AngularFirestore) { }

  addComentario(comentario:Comentario){
    comentario.fecha = this.myDate;
    return this.db.collection('comentarios').add(comentario)
  }

  getComentarios(uid){
    this.comentarios = this.db.collection<Comentario>('comentarios/', ref=>{
      return ref.where('confesion_uid','==',uid)
    }).snapshotChanges().pipe(map(comentarios=>{
      return comentarios.map(a=>{
        const comentario = a.payload.doc.data();
        const key = a.payload.doc.id;
        return {key, ...comentario};
      })
    }))
    return this.comentarios;
  }
}
