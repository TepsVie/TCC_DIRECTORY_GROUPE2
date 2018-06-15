import { DevInfoPage } from './../dev-info/dev-info';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { BizApiGlobal } from './../../models/bizapi-global.model';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {

  value: string;
  idDev= [];
  devSkills= [];
  devTables = [];
  dev_value: string;
  private baseUrl: string = 'http://tccdirectory.1click.pf/api/';


  constructor(private platfrom: Platform, public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.platfrom.ready().then(() => {
      this.searchBiz();
    });
  }


  searchBiz() {

    this.value = this.navParams.get('value');
    const url = `${this.baseUrl}search`;
    let table = [];
    this.devTables = [];
    this.devSkills = [];

    return this.http.post(url, { 'skills': this.value })
      .map(res => res.json())
      .subscribe((data) => {

        for (let i = 0; i < data.length; i++) {
          if (table.indexOf(data[i].id) == -1) {
            table.push(data[i].id)
            this.devTables.push(data[i]);
            this.devSkills.push(data[i].skills);
          }
        }
        console.log('Développeur: ', this.devTables);
        return this.devTables

      })
  }

  showIdDev(arg) {
    this.idDev = arg;
    console.log('ID du DEV: ', this.idDev);
    this.navCtrl.push(DevInfoPage, { 
     idDevValue: this.idDev})
  }

}



