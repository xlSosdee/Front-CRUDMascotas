import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//Componentes
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos de Angular Material
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarMascotaComponent,
    ListadoMascotasComponent,
    VerMascotaComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
