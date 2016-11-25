import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { ElevatorComponent } from '../../components/elevator/elevator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(ElevatorComponent)
  private _elevator: ElevatorComponent;
  geoPos:any;

  constructor(public navCtrl: NavController) {
    this.loadPosition()
    //this.loadGoogleMaps()
  }

  loadPosition():void{
    let watch = Geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     console.log('pos->', data)
     this._elevator.displayLocationElevation(data)
     this.geoPos = data
    });
  }

}
