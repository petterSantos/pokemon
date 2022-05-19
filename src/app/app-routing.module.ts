import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';

const routes: Routes = [ {
  path: '',
  component: PokemonComponent
  },
 // redirigimos cualquier ruta no registrada a la URL not-found
 { path: '**', redirectTo: '/not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
