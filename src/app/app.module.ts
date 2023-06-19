import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MapComponent } from './map/map.component';
import {AppRoutingModule} from "./app-routing.module";
import { CardsComponent } from './cards/cards.component';


@NgModule({ //ng modül decorator esasında bir fonksiyondur ve içerisine parametre olarak propertyler alır
  declarations: [
    AppComponent,
    MapComponent,
    CardsComponent,
  ],
  imports: [ //içerisinde bulunan componentleri kullanmak istediğimiz modülleri ekleriz
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
