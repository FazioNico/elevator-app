import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GoogleMapComponent } from '../../components/google-map/google-map';

declare var google;
/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  geoPoint:any;

  @ViewChild(GoogleMapComponent)
  gMapComponent: GoogleMapComponent;

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {
    this.geoPoint = this.params.get('geoPos')
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    //console.log('Hello MapPage! Google Map SDK ready->', google);
    this.gMapComponent.initMap()
  }

  goBack(){
    this.gMapComponent.unsubscribe()
    this.navCtrl.pop()
  }
}
