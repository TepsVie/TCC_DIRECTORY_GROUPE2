
// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


// Models
// Importez vos models ici

import { SkillsApiGlobal } from '../models/skillsapi-global.model'
import { BizApiGlobal } from '../models/bizapi-global.model'
import { Observable } from 'rxjs/Observable';

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
