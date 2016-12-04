import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Geolocation } from 'ionic-native';

/*
  Generated class for the Geolocalisation provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Geolocalisation {

  constructor(public http: Http) {
    console.log('Hello Geolocalisation Provider');
  }

  getPosition():Observable<any>{
    let geoposition = Geolocation.watchPosition()
    geoposition.debounceTime(1000)
    return geoposition;
  }
}
