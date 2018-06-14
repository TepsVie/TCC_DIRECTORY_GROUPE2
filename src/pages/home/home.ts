import { BusinessPage } from './../business/business';
import { SkillsApiGlobal } from './../../models/skillsapi-global.model';
import { SkillsApiService } from './../../services/skillsapi.service';

import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InformationPage } from '../information/information';
import { FavorisPage } from '../favoris/favoris';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toppings : Array<string>;
  skills: SkillsApiGlobal = new SkillsApiGlobal;
  selected_value: string;
  value: string;


  constructor(private platfrom: Platform, public navCtrl: NavController, private skillsApiService: SkillsApiService) {
    this.platfrom.ready().then(() => {
      this.getSkills();
    });
  }

  //Get Selected Value
  showselected($event) {
    this.selected_value = $event;
    console.log(this.selected_value);
    this.pushLists();
  }

  //Get Skills From Api
  getSkills() {
    this.skillsApiService.getSkills()
      .then(skillsFetched => {
        this.skills = skillsFetched; this.skills.data[0].checked = false;
        console.log("skill0", this.skills.data.length);
        for (let i = 0; i < this.skills.data.length; i++) {
          this.skills.data[i].checked = false;
        }
        console.log(JSON.stringify(this.skills));
      })
  }

  selectAllSkills() {
    for (let i = 0; i < this.skills.data.length; i++) {
      this.skills.data[i].checked = true;
    }
  }

  //Push to Developper List Page
  pushLists() {

    this.navCtrl.push(BusinessPage, {
      value: this.selected_value.toString()
    })
  }

  //Push to Favoris Page
  pushFavoris() {
    this.navCtrl.push(FavorisPage)
  }

  //Push to Info Page
  pushInfo() {
    this.navCtrl.push(InformationPage)
  }
}
