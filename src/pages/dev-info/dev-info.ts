import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InfoBizGlobal } from './../../models/infobiz-global.model';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { AlertController, ToastController } from 'ionic-angular';



@Component({
  selector: 'page-dev-info',
  templateUrl: 'dev-info.html',
})
export class DevInfoPage {

  private baseUrl: string = 'http://tccdirectory.1click.pf/api/business/';
  private abusUrl: string = 'http://tccdirectory.1click.pf/api/abus/business/';
  devInfos: InfoBizGlobal = new InfoBizGlobal;
  abusInfo: string;
  public swipe: number = 0;
  url: string;
  phoneNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private iab: InAppBrowser, private callNumber: CallNumber, private sms: SMS, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.getLaunch();
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
    const url = `${this.baseUrl}${this.navParams.get('idDevValue')}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as InfoBizGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }


  //Signale un abus
  getLaunchAbus(arg) {
    this.getAbus(arg)
      .then(csluiFetched => {
        this.abusInfo = csluiFetched;
        console.log(this.abusInfo);
        this.presentToast();
      })
  }

  getAbus(arg): Promise<any> {

    const url = `${this.abusUrl}${arg}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as InfoBizGlobal)
      .catch(error => console.log('Une erreur est survenue ' + error))
  }
/* 
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Signaler',
      subTitle: 'Vous avez signaler cette page',
      buttons: ['OK']
    });
    alert.present();
  } */

  presentToast() {
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

}
