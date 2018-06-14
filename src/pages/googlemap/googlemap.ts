  import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
  } from '@ionic-native/google-maps';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
  import { Component, ViewChild, ElementRef} from "@angular/core/";
  import { Geolocation } from '@ionic-native/geolocation';
 
  
  declare var google;
  
  @Component({
    selector: 'page-googlemap',
    templateUrl: 'googlemap.html',
  })
  export class GooglemapPage {
    
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    

    constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) { }
  
    ionViewDidLoad() {
      this.loadMap();
    }
  
    loadMap() {
      this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(48.866667, 2.333333);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    }, (err) => {
      console.log(err);
    });
  }
  

}
