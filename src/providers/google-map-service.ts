import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {GMAP_API_KEY} from "../providers/gmap-config-api.ts";

declare var google;

/*
  Generated class for the GoogleMapService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleMapService extends EventEmitter<any> {

  apiKey:string = GMAP_API_KEY;
  mapInitialised:boolean = false;

  constructor(
    public http: Http
  ) {
    super()
    console.log('Load GoogleMapService Provider');
    this.loadGoogleMaps()
  }

  /* Google Map loading & Initiallisation */
  loadGoogleMaps():void{
     this.addConnectivityListeners();
     if(typeof google == "undefined" || typeof google.maps == "undefined"){
       //console.log("Google maps JavaScript needs to be loaded.");
       if(navigator.onLine === true){
         //console.log("online, loading map");
         //Load the SDK with the callback
         window['mapInit'] = () => {
           this.initMap();
         }
         let script:HTMLScriptElement = document.createElement("script");
         script.id = "googleMaps";
         script.async = true;
         if(this.apiKey){
           script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
         } else {
           script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
         }
         document.body.appendChild(script);
       }
     }
     else {
       if(navigator.onLine === true){
         //console.log("map ready");
         this.initMap();
       }
       else {
         this.disableMap();
       }
     }
   }

   /* Events Connectivity listener for Google Map */
   addConnectivityListeners():void{
      let onOnline = () => {
        setTimeout(()=> {
          if(typeof google == "undefined" || typeof google.maps == "undefined"){
            this.loadGoogleMaps();
          }
          else {
            if(!this.mapInitialised){
              this.initMap();
            }
          }
        }, 1000);
      };
      let onOffline = ()=> {
        this.disableMap();
      };
      document.addEventListener('online', _=> onOnline, false);
      document.addEventListener('offline', _=> onOffline, false);
  }

  /* Google Map Core Methodes */
  disableMap():void{
    // here you can do somthing...
  }

  initMap():void {
    this.mapInitialised = true;
    setTimeout(()=>{
      console.log('google SDK init-> ', google)
      this.emit()
    },100)
  }
}
