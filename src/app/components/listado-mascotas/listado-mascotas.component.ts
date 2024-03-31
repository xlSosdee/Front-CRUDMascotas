import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';

import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from 'src/app/services/mascota.service';





@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>;
  loading: boolean = false;

  // Estos ViewChild inicializan instancias dentro de los componentes en cuestion
  // (comunmente son aquellos que vemos textualmente y se pueden modificar en el html, **fijarse en las directivas**)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //En el constructor inicializamos servicios, que comunmente no se pueden acceder a traves del html en sí
  constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.obtenerMascota();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página:';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerMascota();
      },
      error: (error) => {
        this.loading = false;
        alert("Ooops ocurrió un error")
      },
      complete: () => {
        this.mensajeExito();
      }
    });
  }

  obtenerMascota() {
    this.loading = true;

    const timeoutDuration = 30000; // Agregando duración máxima de espera en milisegundos (30 segundos)

    // Temporizador para controlar el tiempo de espera
    const timeout = setTimeout(() => {
      this.loading = false;
      alert("La solicitud ha tardado demasiado. Por favor, inténtalo de nuevo más tarde.");
    }, timeoutDuration);
    
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        clearTimeout(timeout);
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        clearTimeout(timeout);
        this.loading = false;
        alert("Ooops ocurrió un error")
      },
    });
  }

  mensajeExito() {
    //Ctrl + Espacio para ver todo lo que se puede configurar dentro de la función
    this._snackBar.open('La mascota fue eliminada con éxito', '', { duration: 2500, horizontalPosition: 'right' });
  }


}
