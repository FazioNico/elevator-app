import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';

import { ElevatorComponent } from '../components/elevator/elevator';
import { GoogleMapComponent } from '../components/google-map/google-map';

import { GoogleMapService } from '../providers/google-map-service';
import { Geolocalisation } from '../providers/geolocalisation';

import {GMAP_API_KEY} from "../providers/gmap-config-api";


const ionicAppConfig:Object = {
  mode: 'md'
};
const pages:Array<any> = [
  HomePage,
  MapPage
];
const components:Array<any> = [
  ElevatorComponent,
  GoogleMapComponent
];
const pipes:Array<any> = [];
const providers:Array<any> = [
  {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
  GoogleMapService,
  Geolocalisation
]

@NgModule({
  declarations: [MyApp, ...pages, ...components, ...pipes],
  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig, GMAP_API_KEY)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [...providers]
})
export class AppModule {}
