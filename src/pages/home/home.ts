import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnboardingPage } from '../../pages/onboarding/onboarding';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
}
