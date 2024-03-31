import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  form: FormGroup
  operacion: string = 'Agregar';
  id!: number;
  suscripcion!: Subscription;


  constructor(private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required]
    });
    //console.log("ID",Number(this.aRoute.snapshot.paramMap.get('id')));

  }
  ngOnInit() {
    this.suscripcion = this.aRoute.params.subscribe(data => {
      //Devuelve este tipo de data: {id: '2'}
      this.id = Number(data['id']);
    });

    if (!Number.isNaN(this.id)) {
      this.operacion = 'Editar';
      this.loading = true;
      this._mascotaService.getMascota(this.id).subscribe((data) => {
        this.loading = false;
        this.form.setValue({
          nombre: data.nombre,
          raza: data.raza,
          color: data.color,
          edad: data.edad,
          peso: data.peso,
        });

      })

    }


  }
  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  guardarFormulario() {

    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso

    }

    if (this.operacion == 'Editar') {
      mascota.id = this.id;
      this.editarMascota(mascota);

    } else {
      this.agregarMascota(mascota);
    }


  }

  agregarMascota(mascota: Mascota) {
    this.loading = true;
    this._mascotaService.postMascota(mascota).subscribe({
      next: (data) => {
        this.loading = false;
        this.router.navigate(['/listadoMascota'])
      },
      error: () => alert("Ooops ocurrió un error"),
      complete: () => this.mensajeExito('guardada'),
    });
  }
  editarMascota(mascota: Mascota) {
    this.loading = true;
    this._mascotaService.editMascota(mascota).subscribe((data) => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/listadoMascota']);
    });
  }

  mensajeExito(texto: string) {
    //Ctrl + Espacio para ver todo lo que se puede configurar dentro de la función
    this._snackBar.open(`La mascota fue ${texto} con éxito`, '', { duration: 2500, horizontalPosition: 'right' });
  }


}
