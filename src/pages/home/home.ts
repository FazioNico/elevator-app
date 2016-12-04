import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable }   from 'rxjs/Observable';

import { ElevatorComponent } from '../../components/elevator/elevator';

import { MapPage } from '../map/map';

import { GoogleMapService } from '../../providers/google-map-service';
import { Geolocalisation } from '../../providers/geolocalisation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(ElevatorComponent)
  elevator: ElevatorComponent;
  geoPos:any;
  watch:Observable<any>;
  subscribe:any;

  constructor(
    public navCtrl: NavController,
    private _gMapService: GoogleMapService,
    private _geoLocService: Geolocalisation
  ) {
    this._gMapService.subscribe(event => this.loadPosition())
  }

  /* Core Methodes */
  loadPosition():void{
    this.watch = this._geoLocService.getPosition();
    this.watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     console.log('pos->', data)
     this.elevator.displayLocationElevation(data)
     this.geoPos = data
    });
  }

  round(data:string, decimal:number = 0):string{
    //return (Number(data).toFixed(+decimal)).toString()
    return (Number(data)).toString()
  }

  goToMap(){
    //this.sub.unsubscribe()
    this.navCtrl.push(MapPage, {
      'geoPos': this.geoPos
    })
  }
}
