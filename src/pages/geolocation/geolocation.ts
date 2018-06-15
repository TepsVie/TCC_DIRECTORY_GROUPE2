import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  colo: any;
  pussy: any;

  devInfos: InfoBizGlobal = new InfoBizGlobal;
  private baseUrl: string = 'http://tccdirectory.1click.pf/api/business/';

  constructor(
    public navCtrl: NavController, private navParams: NavParams, private http: Http) { }


  ionViewWillEnter() {

    this.getDevInfo();

  }

  //Récupère Longitude et Latitude du Développeur
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
        this.colo = this.results[0].latitude;
        this.pussy = this.results[0].longitude;
        this.loadMap();
        return this.results;
      });
  }

  //Création de la MAP
  loadMap() {
    let latLng = new google.maps.LatLng(48.85837009999999, 2.2944813000000295);
    let mapOptions = {
      center: latLng,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      travelMode: google.maps.TravelMode.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  //Marqueur du Développeur
  addResultsMarker() {
    console.log('Coords: ', this.results[0].latitude, this.results[0].longitude)
    marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(
        this.results[0].latitude,
        this.results[0].longitude,
      ),

    });
    this.initDirections();
  }

  //Marqueur de Paris
  addMarker() {
    marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(48.85837009999999, 2.2944813000000295)
    });

    let content = "<p>Voues etes ici</p>";

    this.addInfoWindow(marker, content);
    this.addResultsMarker();
  }

  //Information du marqueur de Paris 
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  //Affiche le trajet entre les 2 marqueurs
  initDirections() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = this.map;
    let destLatLng = new google.maps.LatLng(this.colo, this.pussy);
    directionsDisplay.setMap(map);
    console.log('test initDirections');
    this.calculateAndDisplayRoute(directionsService, directionsDisplay, destLatLng);
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay, destLatLng) {
    let latLng = new google.maps.LatLng(
      48.8584,
      2.2945);
    directionsService.route({
      origin: latLng,
      destination: destLatLng,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

