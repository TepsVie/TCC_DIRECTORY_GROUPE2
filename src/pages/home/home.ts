import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FavorisPage } from '../favoris/favoris'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  database: SQLiteObject;

  constructor(public navCtrl: NavController, private sqlite: SQLite) {

  }

   // création de la base
   initDb() {
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createDataBaseTable();
      })
      .catch(e => console.log(e));
  }


   //création de la table de donnée
   createDataBaseTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS favoris (id INTEGER PRIMARY KEY, name TEXT )', {})
      .then((db: SQLiteObject) => {
        
      })
      .catch(e => console.log(e));
  }

}
