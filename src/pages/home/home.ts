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

  toppings: Array<string>;
  skills: SkillsApiGlobal = new SkillsApiGlobal;
  selected_value: string;
  value: string;

  constructor(private platfrom: Platform, public navCtrl: NavController, private skillsApiService: SkillsApiService) {
    this.platfrom.ready().then(() => {
      this.getSkills();
    });
  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }
  //Récupère les compétences sélectionné et Push vers Listes des Développeurs
  showselected($event) {
    this.selected_value = $event;
    console.log('Id Skill Sélectionné: ',this.selected_value);
    this.navCtrl.push(BusinessPage, {
      value: this.selected_value.toString()
    })
  }

  //Récupère les compétences dans l'API
  getSkills() {
    this.skillsApiService.getSkills()
      .then(skillsFetched => {
        this.skills = skillsFetched; this.skills.data[0].checked = false;
        for (let i = 0; i < this.skills.data.length; i++) {
          this.skills.data[i].checked = false;
        }
        console.log('Compétences: ',JSON.stringify(this.skills));
      })
  }

  selectAllSkills() {
    for (let i = 0; i < this.skills.data.length; i++) {
      this.skills.data[i].checked = true;
    }
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
