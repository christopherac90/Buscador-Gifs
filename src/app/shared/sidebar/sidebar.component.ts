import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){
    return this.servicio.historial;
  }

  constructor(private servicio: GifsService){
    
  }

  buscar(termino:string){
    this.servicio.buscarGifs(termino);
  }

}
