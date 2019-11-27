import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<HeroeModel>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
      });
    });

  }

}
