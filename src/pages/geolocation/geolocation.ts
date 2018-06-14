// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation'

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { DevInfoPage } from '../devinfo/devinfo';

declare var google;

@Component({
  selector: 'geolocation-page',
  templateUrl: 'geolocation.html'
})
export class GeolocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;

  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation
  ) {}
// Récupérer la position actuel
  ionViewDidLoad() {
    this.loadMap();
    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    })
      .catch(err => console.log(err));
  }
// Afficher la position
  loadMap() {

    this.geolocation.getCurrentPosition().then(
      position => {

        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions);

          this.addMarker();

      },

      err => {
        console.log(err);
      }

    );

  }

// Ajouter un marqueur
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
// Afficher les info
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  // pushDevInfo() {
  //   console.log("pushDevInfo")
  //   this.navCtrl.push(DevInfoPage);
  // }


 
  pushHome() {
    console.log("pushGeolocation")
    this.navCtrl.push(GeolocationPage);
  }
}

