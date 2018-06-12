import { SkillsApiData } from './skillsapi-data.model';


export interface BizApiData {

    id: number;
    name: string;
    logo: string;
    latitude: number;
    longitude: number;
    abus: number;
    skills: SkillsApiData[];

}