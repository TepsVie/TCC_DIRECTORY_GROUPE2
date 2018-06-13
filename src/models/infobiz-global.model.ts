import { InfoBizSkill } from './infobiz-skill.model';

export class InfoBizGlobal {

    id: number;
    name: string;
    description: string;
    logo: string;
    email: string;
    phone: string;
    mobile: string;
    website_url: string;
    facebook_url: string;
    twitter_url: string;
    linkedin_url: string;
    adresse: string;
    monday_start: string;
    monday_end: string;
    tuesday_start: string;
    tuesday_end: string;
    wednesday_start: string;
    wednesday_end: string;
    thursday_start: string;
    thursday_end: string;
    friday_start: string;
    friday_end: string;
    saturday_start: string;
    saturday_end: string;
    sunday_start: string;
    sunday_end: string;
    latitude: number;
    longitude: number;
    abus: number;
    created_at: string;
    updated_at: string;
    skills: InfoBizSkill[];

}