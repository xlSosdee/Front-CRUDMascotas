import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy{
  
  id!: number;
  mascota!: Mascota;
  loading: boolean = false;
  //Creamos la siguiente variable para gestionar la suscripcion a nuestro servicio
  routeSub!: Subscription
  

  constructor(private _mascotaService : MascotaService,
    private aRoute: ActivatedRoute){
      /*De esta manera capturamos el valor del id que aparece en la ruta (Manera Alternativa, más sencilla)
      Esto solo se hace una sola vez, por lo que si por el algun motivo el id cambia NO VEREMOS LOS DATOS ACTUALIZADOS
      Ejm: Estamos en  http://localhost:4200/verMascota/2 para luego ir http://localhost:4200/verMascota/3 (en la misma vista)
      Seguiremos viendo los datos de la mascota 2 ya que el constructor solo se renderiza una vez*/
      //this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }
  
  ngOnInit(){

    this.routeSub = this.aRoute.params.subscribe(data =>{
      this.id = data['id'];
      this.verMascota();
    })

    
  }

  //Nos desuscribimos del observable para prevenir data leaks cuando el componente este en desuso
  //** Cabe mencionar que esta práctica no es necesaria para observables devueltos por peticiones http ya que lo hacen automáticamente**
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  verMascota(){
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe(data => {
      this.mascota = data; 
      this.loading = false;
      
    })
  }




}
