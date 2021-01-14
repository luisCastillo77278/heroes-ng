import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModels } from '../models/heroe.model';

import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-ddbb5-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe( heroe: HeroeModels ){
    console.log(heroe);
    return this.http.post(`${ this.url }/heroes.json`, heroe )
            .pipe(
              map( (resp: any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );
  }

  modificarHeroe( heroe: HeroeModels){

    const h = {
      ...heroe
    };
    delete h.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, h);

  }

  eliminarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe( id: string ){
    return this.http.get(`${this.url}/heroes/${ id }.json`);
  }

  obtenerHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map( this.tranformArray ),
              delay(1500)
            );
  }

  private tranformArray( heroeObject: object){
    const arrayHeroes: HeroeModels [] = [];
    if (heroeObject === null){
      return [];
    }
    Object.keys( heroeObject ).forEach( element => {
      const heroe: HeroeModels = heroeObject[element];
      heroe.id = element;
      arrayHeroes.push(heroe);
    });
    return arrayHeroes;
  }
}
