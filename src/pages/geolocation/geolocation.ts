// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation'
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { DevInfoPage } from '../devinfo/devinfo';
declare var google;
var marker;

@Component({
  selector: 'geolocation-page',
  templateUrl: 'geolocation.html'
})
export class GeolocationPage {

  @ViewChild('map') mapElement: ElementRef;

  
  map: any;
  // lat: number;
  // lng: number;
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) { }
  // Récupérer la position actuel
  ionViewDidLoad() {
    this.loadMap();
    // this.geolocation.getCurrentPosition().then(pos => {
    //   this.lat = 48.858053;
    //   this.lng = 2.294289;
    }



  // Afficher la position
  loadMap() {

    this.geolocation.getCurrentPosition()

      .then((resp) => {
        let latLng = new google.maps.LatLng(48.85837009999999, 2.2944813000000295);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          travelMode: google.maps.TravelMode.ROADMAP
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);

        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: 'MAP',
        });

        err => {
          console.log(err);
        }
      });
  }
}
