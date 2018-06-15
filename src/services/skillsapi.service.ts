
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SkillsApiGlobal } from '../models/skillsapi-global.model'


@Injectable()
export class SkillsApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
   

    constructor(private http: Http) { }

    public getSkills(): Promise<any> {
        const url = `${this.baseUrl}skills`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SkillsApiGlobal)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }



}
