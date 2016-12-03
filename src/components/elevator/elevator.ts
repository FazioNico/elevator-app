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

  constructor(
    private _ngZone: NgZone
  ) {
    //this.loadGoogleMaps();
  }


    /* Elevator API  Methode */
    displayLocationElevation(location:any):void {
      //console.log('test search-> ', this.mapInitialised)
      if(google === false || !location.coords){
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
