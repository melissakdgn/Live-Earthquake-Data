import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {MapComponent} from "./map/map.component";
import { Routes, RouterModule } from '@angular/router';
import {CardsComponent} from "./cards/cards.component";

const routes: Routes = [
  {path:'', component:AppComponent, pathMatch:'full'},
  {path:'Cards', component:CardsComponent, pathMatch:'full'},
  {path:'Map', component:MapComponent,pathMatch:'full'}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
