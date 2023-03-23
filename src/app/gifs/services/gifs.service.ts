import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.Interface';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = [];
  private apikey: string = '42vnM92k0Zyo5VUj1lusvIWoerC3aLQ6';
  
  public resultados: Gif[]=[];
  
  get historial(){
    
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
   // if(localStorage.getItem('historial')){
   //   this._historial = JSON.parse(localStorage.getItem("historial")! );
    //}
    
  }

  buscarGifs(query:string){
    
    if(query === '' ){
      return;
    }

    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);  
      this._historial = this._historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(      
      `http://api.giphy.com/v1/gifs/search?api_key=${this.apikey}&q=${query}&limit=10`)
    .subscribe(
      (resp ) => {
        this.resultados = resp.data;
        localStorage.setItem("resultados", JSON.stringify(resp.data));
      });
  }

}
