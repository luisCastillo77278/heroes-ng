import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroeModels } from 'src/app/models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModels[] = [];
  cargando = false;
  constructor(private heroesService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.obtenerHeroes()
      .subscribe( resp =>{ 
        this.heroes = resp;
        this.cargando = false;
      });

  }

  editarHeroe( id: string ){
    this.router.navigate(['heroe', id ]);
  }

  eliminarHeroe( id: string, index: number){

    Swal.fire({
      title: 'Eliminar heroe',
      text: '¿Desea realmente eliminar el heroe?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      console.log( resp );
      if( resp.value ){
        this.heroesService.eliminarHeroe( id )
          .subscribe();
        this.heroes.splice(index, 1);
      }
    });

  }

}
