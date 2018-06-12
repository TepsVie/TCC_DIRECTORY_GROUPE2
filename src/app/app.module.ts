import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { GeolocationPage } from '../pages/geolocation/geolocation';
//PULG-IN
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // OnboardingPage,
    GeolocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // OnboardingPage,
    GeolocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    InAppBrowser,
    CallNumber,
    SMS,
    Geolocation
  ]
})
export class AppModule {}
