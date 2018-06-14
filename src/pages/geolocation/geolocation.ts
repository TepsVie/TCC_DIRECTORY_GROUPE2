import { FavorisPage } from "../favoris/favoris";
import { Http } from "@angular/http";
import { SkillsApiService } from "../../services/skillsapi.service";
import { Geolocation } from "@ionic-native/geolocation";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { DevInfoPage } from "../dev-info/dev-info";
import { InformationPage } from "../information/information";
declare var google;
var marker;

@Component({
  selector: "map-page",
  templateUrl: "map.html"
})
export class MapPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  value: string;
  results = [];
  mapResults = [];
  menuId: number;
  businessInfo: any;

  constructor(
      public navCtrl: NavController,
      public geolocation: Geolocation,
      public navParams: NavParams,
      public SkillsApiService: skillsapi.service,
      public http: Http,
      public menuCtrl: MenuController
  ) {
  }

  ionViewDidLoad() {

      let mapOptions = {
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
      );

      this.loadMap();

      if(this.navParams.get('fromPage') == "infos") {
          this.showDirection();
      } else {
          this.getSearchResults();
      }
  }

  showDirection() {
      let x = this.navParams.get('x');
      let y = this.navParams.get('y');
      this.initDirections(x,y);
  }


  // Récupère les filtres de SearchPage et envoie une requête à l'API
  getSearchResults() {
      this.value = this.navParams.get("value");
      this.results = [];
      const url = `http://tccdirectory.1click.pf/api/search`;

      return this.http
          .post(url, { skills: this.value })
          .map(res => res.json())
          .subscribe(data => {
              for (let i = 0; i < data.length; i++) {
                  if (this.results.indexOf(data[i]) == -1) {
                      this.results.push(data[i]);
                  }
              }
              console.log("Développeur: ", this.results);
              console.log("Critères de recherche", this.value);
              this.addResultsMarker();
              return this.results;
          });
  }

  // Initialise la carte centrée sur la position du téléphone
  loadMap() {
      console.log("Load map");

      // *** Récupère la position du téléphone, centre la carte sur cette position et y ajoute un marqueur ***
      // this.geolocation.getCurrentPosition().then((position) => {
      //         let latLng = new google.maps.LatLng(
      //             position.coords.latitude,
      //             position.coords.longitude
      //         );
      //         this.map.setCenter(latLng);
      //         this.addMarker();
      //         console.log(position);
      //     })
      //     .catch((error) => {
      //         console.log('Error getting location', error);
      //       });
      let latLng = new google.maps.LatLng(48.8584, 2.2945);
      this.map.setCenter(latLng);
      this.addMarker();
  }

  // Ajoute un marqueur au centre de la carte
  addMarker() {
      let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter(),
          title: "Vous êtes ici",
          label: "Moi"
      });

      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);
  }

  // Fenêtre d'information liée au marqueur initial
  addInfoWindow(marker, content) {
      let infoWindow = new google.maps.InfoWindow({
          content: "Vous êtes ici"
      });

      google.maps.event.addListener(marker, "click", () => {
          infoWindow.open(this.map, marker);
      });

      console.log("Avant addResultsMarker");
  }

  // Ajoute des marqueurs pour chaque résultat de la recherche
  addResultsMarker() {
      let marker, i;
      console.log(this.results);
      for (i = 0; i < this.results.length; i++) {
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(
                  this.results[i].latitude,
                  this.results[i].longitude
              ),
              map: this.map
          });

          google.maps.event.addListener(
              marker,
              "click",
              (function(marker, i, context) {
                  return function() {
                      context.navCtrl.push(InfosPage, {
                          businessId: context.results[i].id
                      });
                  };
              })(marker, i, this)
          );
      }
  }

  initDirections(destLat, destLng) {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = this.map;
      let destLatLng = new google.maps.LatLng(destLat, destLng);

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
      }, function(response, status) {
          if (status === 'OK') {
          directionsDisplay.setDirections(response);
          } else {
          window.alert('Directions request failed due to ' + status);
          }
      });
  }

  goToListPage() {
      this.mapResults = [];
      this.navCtrl.push(ListPage, { mapResults: this.results });
  }

  goToInfosPage() {
      this.navCtrl.push(InfosPage, this.results);
  }
  goToFavoritesPage() {
      this.navCtrl.push(FavoritesPage);
  }
}
