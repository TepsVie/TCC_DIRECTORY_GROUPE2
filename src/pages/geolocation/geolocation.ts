import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { InfoBizGlobal } from './../../models/infobiz-global.model';

declare var google;
var marker;

@Component({
  selector: 'geolocation-page',
  templateUrl: 'geolocation.html'
})
export class GeolocationPage {

  @ViewChild('map') mapElement: ElementRef;

  results = [];
  map: any;

  devInfos: InfoBizGlobal = new InfoBizGlobal;
  private baseUrl: string = 'http://tccdirectory.1click.pf/api/business/';

  constructor(
    public navCtrl: NavController, private geolocation: Geolocation, private navParams: NavParams, private http: Http) { }


  ionViewWillEnter() {

    this.getDevInfo();

  }



  // Afficher la position
  /*  loadMap() {
 
     this.geolocation.getCurrentPosition()
 
       .then((resp) => {
         this.addResultsMarker();
         let latLng = new google.maps.LatLng(, 2.2944813000000295);
         let mapOptions = {
           center: latLng,
           zoom: 7,
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
    */
  loadMap() {

    let latLng = new google.maps.LatLng(48.85837009999999, 2.2944813000000295);

    let mapOptions = {
      center: latLng,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      travelMode: google.maps.TravelMode.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addResultsMarker();
    this.addMarker();
  }


  addResultsMarker() {
    console.log('Coords: ', this.results[0].latitude, this.results[0].longitude)
    marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(
        this.results[0].latitude,
        this.results[0].longitude,
      ),

    });
  }
  addMarker() {

    marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(48.85837009999999, 2.2944813000000295)
    });

    let content = "<p>Voues etes ici</p>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getDevInfo() {
    const url = `${this.baseUrl}${this.navParams.get('idDevValue')}`;
    this.results = [];
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(data => {
        console.log('Data:', data);
        this.results.push(data);
        console.log("Développeur: ", this.results);

        this.loadMap();
        return this.results;
      });
  }


}

