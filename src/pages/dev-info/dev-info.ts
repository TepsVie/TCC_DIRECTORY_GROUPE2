import { GeolocationPage } from './../geolocation/geolocation';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InfoBizGlobal } from './../../models/infobiz-global.model';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';




@Component({
  selector: 'page-dev-info',
  templateUrl: 'dev-info.html',
})
export class DevInfoPage {

  segments: string = "Description";
  private baseUrl: string = 'http://tccdirectory.1click.pf/api/business/';
  private abusUrl: string = 'http://tccdirectory.1click.pf/api/abus/business/';
  devInfos: InfoBizGlobal = new InfoBizGlobal;
  abusInfo: string;
  public swipe: number = 0;
  url: string;
  phoneNumber: string;
  favActive: boolean;
  toast: any;

  db: SQLiteObject;

  dev_ID: number;
  dev_Name: string;

  favValue: any;
  idDev = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private iab: InAppBrowser, private callNumber: CallNumber, private sms: SMS, private toastCtrl: ToastController, private sqlite: SQLite) {



  }


  ionViewWillEnter() {
    this.dev_ID = this.navParams.get('idDevValue');
    this.getLaunch();
    this.trueFalse();
  }

  //Récupère la liste des dev
  getLaunch() {
    this.getDevInfo()
      .then(skillsFetched => {
        this.devInfos = skillsFetched;
        console.log(this.devInfos);
      })
  }

  getDevInfo(): Promise<any> {
    const url = `${this.baseUrl}${this.dev_ID}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as InfoBizGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }


  //Signale un abus
  getLaunchAbus(arg) {
    this.getAbus(arg)
      .then(abusFetched => {
        this.abusInfo = abusFetched;
        console.log(this.abusInfo);
        this.abusToast();
      })
  }

  getAbus(arg): Promise<any> {

    const url = `${this.abusUrl}${arg}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as InfoBizGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }

  abusToast() {
    const toast = this.toastCtrl.create({
      message: "Merci d'avoir signalé cette page",
      duration: 2400,
      position: 'top'
    });
    toast.present();
  }

  //Méthode Browser
  openWebPage(url: string) {
    this.iab.create(url, '_system');
  }

  //Méthode Call Number
  callDev(phoneNumber: string) {
    this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //Méthode SMS
  sendSms(phoneNumber: string) {
    this.sms.send(phoneNumber, '');
  }

  trueFalse() {
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("SELECT * FROM favoris WHERE dev_id = " + this.dev_ID, {})
          .then((data) => {
            console.log('ehoa: ', JSON.stringify(data.rows));
            if (data.rows.length == 1) {
              this.favActive = true;
              console.log('Fav Value: True', data.rows.lenght)
            }
            else {
              this.favActive = false;
              console.log('Fav Value: False', data.rows.lenght)
            }
          })
      })
  }

  //Favoris
  devToFavoris(devName) {
    this.sqlite.create({
      name: 'datafavoris.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.updateFavoris();

        if (this.favActive == true) {
          db.executeSql("INSERT INTO favoris ('dev_id', 'name', 'fav') VALUES (?,?, 1)", [this.dev_ID, devName])
            .then(() => console.log('Insert Sucess', db))
            .catch(e => console.log(e));
          db.executeSql("UPDATE favoris SET fav = 1 where dev_id=?", [this.dev_ID])
            .then(() =>
              console.log('fav set to 1')
            )
        }
        else if (this.favActive == false) {
          db.executeSql("UPDATE favoris SET fav = 0 where dev_id=?", [this.dev_ID])
            .then(() =>
              console.log('fav set to 0')
            )
        }
      })
      .catch(e => console.log(e));
  }

  updateFavoris() {
    this.favActive = !this.favActive;
    console.log('Favoris new state:' + this.favActive);
    this.favoriteToast();

  }

  favoriteToast() {
    if (this.favActive == true) {
      this.toast = this.toastCtrl.create({
        message: "Ajouté aux favoris",
        duration: 2400,
        position: 'bottom'
      });

    }
    else {
      this.toast = this.toastCtrl.create({
        message: "Retiré des favoris",
        duration: 2400,
        position: 'bottom'

      })
    }
    this.toast.present();
  }

  showIdDev(arg) {
    this.idDev = arg;
    console.log('ID du DEVinfo: ', this.idDev);
    this.navCtrl.push(GeolocationPage, {
      idDevValue: this.idDev
    })
  }

}
