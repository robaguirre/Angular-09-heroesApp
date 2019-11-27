import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-44cac.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel): Observable<HeroeModel> {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel): Observable<HeroeModel> {

    // Si pasamos todo el objeto en BBDD tb nos crearía la propiedad del id
    // y esa es padre
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp).pipe(
      map(resp => heroe)
    );
  }

  deleteHeroe(id: string): Observable<any> {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string): Observable<any> {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(): Observable<HeroeModel[]> {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      // map(resp => this.crearArreglo(resp))
      map(this.crearArreglo),
      // Este delay es para retrasar la carga y poder ver el mensaje
      delay(500)
    );
  }

  private crearArreglo(heroesObj: object): HeroeModel[] {

    const heroes: HeroeModel[] = [];

    if (heroesObj === null) { return []; }

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }

}
