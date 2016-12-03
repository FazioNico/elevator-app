import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';

import { ElevatorComponent } from '../components/elevator/elevator';

import { GoogleMapService } from '../providers/google-map-service';

const ionicAppConfig:Object = {
  mode: 'md'
};
const pages:Array<any> = [
  HomePage,
  MapPage
];
const components:Array<any> = [
  ElevatorComponent
];
const providers:Array<any> = [
  {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
  GoogleMapService
]

@NgModule({
  declarations: [MyApp, ...pages, ...components],
  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [...providers]
})
export class AppModule {}
