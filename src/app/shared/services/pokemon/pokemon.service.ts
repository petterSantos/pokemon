import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
url = environment.url;
private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor( private http: HttpClient) { }

  getAllPokemons():Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`${this.url}?idAuthor=1`)
    console.log(`${this.url}?idAuthor=1`)
  }
  getPokemon(id : number):Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.url}${id}`)
  }

  postPokemon(pokemon:Pokemon):Observable<any>{
    return this.http.post(`${this.url}?idAuthor=1`,pokemon)
  }

  editPokemon(id:number,pokemon:Pokemon):Observable<Pokemon>{
    console.log(`${this.url}${id}`)
    return this.http.put<Pokemon>(`${this.url}${id}`,pokemon,{headers: this.httpHeaders})
  }

  delete(id:number):Observable<any>{
    return this.http.delete(`${this.url}${id}`)
  }
}
