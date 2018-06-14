import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  database: SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDb();
    })
  }
  //Go Home Method
  skip() {
    this.navCtrl.push(HomePage);
  }
  pushHome() {
    this.navCtrl.push(HomePage);
  }

  //DataBase
  initDb() {
    console.log('initDb launched');
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Database created');
        this.database = db;
        this.createFavorisTable();
      })
      .catch(e => console.log(e));
  }


  //création de la table de donnée
  createFavorisTable() {
    console.log('createDataBaseTable launched');
    this.database.executeSql("CREATE TABLE IF NOT EXISTS favoris ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'dev_id' INTEGER UNIQUE, 'name' TEXT UNIQUE, 'fav' INTEGER)", {})
      .then((db: SQLiteObject) => {
        console.log('Table FAVORIS created');
      })
      .catch(e => console.log(e));
  }

  //suppression  de la table
  dropFavorisTable(): any {
    this.database.executeSql('DROP TABLE favoris', {})
      .then(() => {
        console.log('Table FAVORIS dropped');
      })
      .catch(e => console.log(e));

  }


}
