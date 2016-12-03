import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable }   from 'rxjs/Observable';

import { Geolocation } from 'ionic-native';

import { ElevatorComponent } from '../../components/elevator/elevator';

import { MapPage } from '../map/map';

import { GoogleMapService } from '../../providers/google-map-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(ElevatorComponent)
  elevator: ElevatorComponent;
  geoPos:Object;

  constructor(
    public navCtrl: NavController,
    private _gMapService: GoogleMapService
  ) {
    this.loadPosition()
  }

  /* Core Methodes */
  loadPosition():void{
    let watch:Observable<any> = Geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     console.log('pos->', data)
     this.elevator.displayLocationElevation(data)
     this.geoPos = data
    });
  }

  round(data:string, decimal:number = 0):string{
    return (Number(data).toFixed(+decimal)).toString()
  }

  goToMap(){
    this.navCtrl.push(MapPage)
  }
}
