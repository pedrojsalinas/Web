import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Confesion } from '../../clases/confesion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfesionService {
  myDate = new Date();
  confesiones: Observable<any[]>;
  confesion: Observable<Confesion>;
  constructor(private db: AngularFirestore) { }

  addConfesion(confesion: Confesion){
    confesion.fecha = this.myDate;
    return this.db.collection('confesiones').add(confesion)
  }

  getConfesiones(){
    this.confesiones = this.db.collection<Confesion>('confesiones', ref=>{
      return ref.orderBy('fecha','desc')
    }).snapshotChanges().pipe(map(confesiones=>{
      return confesiones.map(a=>{
        const confesion = a.payload.doc.data();
        const key = a.payload.doc.id;
        return {key, ...confesion};
      })
    }))
    return this.confesiones;
  }
  // getConfesion(uid: string){
  //   return this.db.collection("confesiones").doc(uid).snapshotChanges();
  // }


  getConfesion(uid: string){
    let doc =  this.db.collection("confesiones").doc(uid);
      this.confesion = doc.snapshotChanges().pipe(map(action=>{
        if(action.payload.exists === false){
          return null;
        }else{
          const data = action.payload.data() as Confesion;
          data.uid = action.payload.id;
          return data;
        }
      }));
      return this.confesion;
    }
}
