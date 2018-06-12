import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { BizApiGlobal } from './../../models/bizapi-global.model';
import { SkillsApiService } from './../../services/skillsapi.service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {

  bizz: BizApiGlobal = new BizApiGlobal;
  data: Observable<any>;
  value: string;

  devTables = [];

  private baseUrl: string = 'http://tccdirectory.1click.pf/api/';


  constructor(private platfrom: Platform, public navCtrl: NavController, public navParams: NavParams, private skillsApiService: SkillsApiService, private http: Http) {
    this.platfrom.ready().then(() => {
      this.searchBiz();
    });
  }


  searchBiz() {

    this.value = this.navParams.get('value');
    const url = `${this.baseUrl}search`;
    let table = [];
    this.devTables = [];

    return this.http.post(url, { 'skills': this.value })
      .map(res => res.json())
      .subscribe((data) => {

        for (let i = 0; i < data.length; i++) {
          if (table.indexOf(data[i].id) == -1) {
            table.push(data[i].id)
            this.devTables.push(data[i]);
          }
        }
        console.log('Développeur: ', this.devTables);
        console.log(this.value);
        return this.devTables

      })
  }

  pushDevInfo() {
    this.navCtrl.push('devInfo')
  }

}



