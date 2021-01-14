import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModels } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModels;

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute) {
    this.heroe = new HeroeModels();
  }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( resp => {
          if ( resp.id !== 'nuevo'){
            this.heroeService.getHeroe( resp.id )
              .subscribe( (heroe: HeroeModels) => {
                this.heroe.id = resp.id;
                this.heroe.nombre = heroe.nombre;
                this.heroe.poder = heroe.poder;
                this.heroe.vivo = heroe.vivo;
              });
          }
        });
  }

  guardar( f: NgForm ){
    if ( f.invalid ){ return; }
    //console.log(this.heroe);

    Swal.fire({
      title: '',
      text: 'Espere un momento',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.heroe.id){
      peticion = this.heroeService.modificarHeroe(this.heroe);
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp =>{
      Swal.fire({
        title: 'Completado',
        text: 'Se actualizo con exito',
        icon: 'success'
      });
    });

  }

}
