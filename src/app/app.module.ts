
import { BusinessPage } from './../pages/business/business';
import { SkillsApiService } from './../services/skillsapi.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { DevInfoPage } from './../pages/dev-info/dev-info';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { GeolocationPage } from '../pages/geolocation/geolocation';

//PULG-IN
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { InformationPage } from '../pages/information/information';
import { FavorisPage } from '../pages/favoris/favoris';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BusinessPage,
    DevInfoPage,
    OnboardingPage,
    GeolocationPage,
    InformationPage,
    FavorisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BusinessPage,
    DevInfoPage,
    OnboardingPage,
    GeolocationPage,
    InformationPage,
    FavorisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    InAppBrowser,
    CallNumber,
    SMS,
    Geolocation,
    SkillsApiService,
    ScreenOrientation
  ]
})
export class AppModule { }
