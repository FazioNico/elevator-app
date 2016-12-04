import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { Observable }   from 'rxjs/Observable';

import { googleMapStyle } from "./gmap-style";

import { Geolocalisation } from '../../providers/geolocalisation';

declare var google;
/*
  Generated class for the GoogleMap component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  text: string;
  map: any;
  marker: any;
  subscribe:any;
  lineCoordinatesArray:Array<any> = [];

  @Input() dataInput: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor(private _geoLocService: Geolocalisation) {
    console.log('Hello GoogleMap Component');

  }

  initMap(){
      console.log('google SDK-> ',google)
      if(google === false){
        return null;
      }
      let myOptions = {
          zoom: 16,
          center: new google.maps.LatLng(this.dataInput.coords.latitude,this.dataInput.coords.longitude),
          mapTypeId: 'roadmap',
          disableDefaultUI: true
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, myOptions);
      this.map.setOptions({styles: googleMapStyle});

      if(!this.dataInput.coords){
        return false;
      }
      this.marker = new google.maps.Marker({
          position: {lat:this.dataInput.coords.latitude, lng: this.dataInput.coords.longitude},
          map: this.map,
          animation: google.maps.Animation.DROP
      });
      this.getPosition()
      //// add event to display details on each markers
      //// get img categories : $imgCat
      // let markerContent = `
      //   <p>You are here</p>
      // `;
      // let infowindow = new google.maps.InfoWindow({
      //   content: markerContent
      // });
      // marker.addListener('click', function() {
      //   infowindow.open(this.map, marker);
      // });
  }

  getPosition(){
     console.log('load getPosition()')
    let watch:Observable<any> = this._geoLocService.getPosition();
    this.subscribe = watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     this.updateMarker(data)
    });
  }

  updateMarker(data){
    console.log('updateMarker')
    this.marker.setPosition(new google.maps.LatLng(data.coords.latitude, data.coords.longitude));
    this.map.setCenter(new google.maps.LatLng(data.coords.latitude, data.coords.longitude));

    this.lineCoordinatesArray.push({'lat': data.coords.latitude, 'lng': data.coords.longitude});
    let lineCoordinatesPath = new google.maps.Polyline({
      path: this.lineCoordinatesArray,
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    lineCoordinatesPath.setMap(this.map);
  }

  unsubscribe(){
    this.subscribe.unsubscribe()
  }
}
