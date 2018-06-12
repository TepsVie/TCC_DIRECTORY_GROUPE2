import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GeolocationPage } from '../geolocation/geolocation';
/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  skip() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }
  
  pushHome() {
    console.log("pushHome")
    this.navCtrl.push(HomePage);
  }
}
