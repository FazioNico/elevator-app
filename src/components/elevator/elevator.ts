import { Component, NgZone } from '@angular/core';

declare var google;

/*
  Generated class for the Elevator component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'elevator',
  templateUrl: 'elevator.html'
})
export class ElevatorComponent {

  text:string;
  elevation:number;
  mapInitialised:boolean = false;
  apiKey:string // = 'YOUR_OWN_GOOGLE_MAP_API_KEY';

  constructor(
    private _ngZone: NgZone
  ) {
    this.loadGoogleMaps();
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
        // console.log('google SDK init-> ', google)
      },100)
    }

    /* Elevator API  Methode */
    displayLocationElevation(location:any):void {
      //console.log('test search-> ', this.mapInitialised)
      if(this.mapInitialised === false || !location.coords){
        return null;
      }
      //console.log('search', location)
      let coords:Array<Object> = [{
        'lat':location.coords.latitude,
        'lng':location.coords.longitude
      }];
      let elevator = new google.maps.ElevationService;
      elevator.getElevationForLocations({
          'locations': coords
      },(results,status)=>{
        if (status === google.maps.ElevationStatus.OK) {
          // Retrieve the first result
          if (results[0]) {
            //console.log(results[0].elevation + ' meters.')

            /* Use NgZone to fix bug with upload observable data input */
            this._ngZone.run(() => {
              this.elevation = +(results[0].elevation).toFixed(0)
            });

          } else {
            console.log(' no result.')
          }
        } else {
          console.log('Elevation service failed due to: ' + status)
        }
      })
    }
}
