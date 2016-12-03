import { Component, ViewChild, Input, ElementRef } from '@angular/core';

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

  @Input() dataInput: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor() {
    console.log('Hello GoogleMap Component');
  }

  initMap(){
    console.log('google SDK-> ',google)
    if(google === false){
      return null;
    }
    //setTimeout(()=>{
      let myOptions = {
          zoom: 13,
          center: new google.maps.LatLng(this.dataInput.coords.latitude,this.dataInput.coords.longitude),
          mapTypeId: 'roadmap',
          disableDefaultUI: true
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, myOptions);

      if(!this.dataInput.coords){
        return false;
      }
      //console.log('data input->', this.dataInput);
      new google.maps.Marker({
          position: {lat:this.dataInput.coords.latitude, lng: this.dataInput.coords.longitude},
          map: this.map,
          title: "You're here"
      });
        //// add event to display details on each markers
        //// get img categories : $imgCat
        // let imgCat:string[]=[];
        // geoPoint.categories.map((cat)=>{
        //   imgCat.push(`<img class="thumbPictoIMG" src="./build/img/picto-recycle/${cat.toLowerCase().replace(/ /g,"-").replace(/é/g,"e").replace(/è/g,"e")}.jpg" />`)
        // })
        // let markerContent = `
        //   <p><strong>Point de récupération</strong>
        //     <br/>
        //     ${geoPoint.label.split('-')[1].replace(/<br \/>/g," ")}
        //   </p>
        //   <p>
        //     ${imgCat.join().replace(/,/g," ")}
        //   </p>
        // `;
        // let infowindow = new google.maps.InfoWindow({
        //   content: markerContent
        // });
        // marker.addListener('click', function() {
        //   infowindow.open(this.map, marker);
        // });

    //},100)

  }
}
