import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes : Routes = [
  {path:'', redirectTo: 'listadoMascota', pathMatch: 'full'},
  {path:'listadoMascota', component: ListadoMascotasComponent},
  {path:'agregarMascota', component: AgregarEditarMascotaComponent},
  {path:'verMascota/:id', component: VerMascotaComponent},
  {path:'editarMascota/:id', component: AgregarEditarMascotaComponent},
  {path:'**', redirectTo:'listadoMascota', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
