import { DevInfoPage } from './../dev-info/dev-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  favoris = [];
  idDev = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
  
  }

  ionViewWillEnter() {
    this.getDbFavoris();
  }

  //Récupére les données de la base de donné
  getDbFavoris() {
    this.favoris = [];
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM favoris WHERE fav = 1', {})
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              this.favoris.push(data.rows.item(i));
            }
          })
      })
  }
  
//Récupère l'ID du Développeur
  showIdDev(arg) {
    this.idDev = arg;
    console.log('ID du DEV: ', this.idDev);
    this.navCtrl.push(DevInfoPage, {
      idDevValue: this.idDev
    })
  }
}
