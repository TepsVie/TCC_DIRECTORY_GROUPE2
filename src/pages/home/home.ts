import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FavorisPage } from '../favoris/favoris'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  database: SQLiteObject;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDb();
    })
  }

  pushFavoris(){
    this.navCtrl.push(FavorisPage);
  }

   // création de la base
   initDb() {
    console.log('initDb launched');
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('db created');
        this.database = db;
        this.dropOeuvresTable();
      })
      .catch(e => console.log(e));
  }


   //création de la table de donnée
   createDataBaseTable() {
    console.log('createDataBaseTable launched');
    this.database.executeSql('CREATE TABLE IF NOT EXISTS favoris (id INTEGER PRIMARY KEY, name TEXT, fav INTEGER)', {})
      .then((db: SQLiteObject) => {
        console.log('table created');
        this.insertFavorisDatas();
        
      })
      .catch(e => console.log(e));
  }

// //suppression  de la table
dropOeuvresTable(): any {
  this.database.executeSql('DROP TABLE favoris', {})
    .then(() => {
      console.log('favoris dropped');
    })
    .catch(e => console.log(e));

}
  
  //insertion des données
  insertFavorisDatas() {
    console.log('insertFavorisDatas launched');
    let inserts =
      "INSERT INTO `favoris` VALUES (id INTEGER PRIMARY KEY, name TEXT, fav INTEGER )," +
      "(1,'ARAI', 0)," +
      "(2,'ARAI', 1)," +
      "(3,'ARAI', 2)," +
      "(4,'ARAI', 3)," +
      "(5,'ARAI', 4),"   
      ;

    this.database.executeSql(inserts, {})

      .then(() => { 
        console.log('données affichées');
      })
      .catch(e => console.log("error insertFavorisDatas",JSON.stringify(e)));

  }


}
