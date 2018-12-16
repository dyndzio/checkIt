import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import * as config from '../environments/environment';
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule} from '@angular/router';
@NgModule({
  declarations: [AppComponent, ProfileComponent],
  entryComponents: [],
  imports:[
      BrowserModule,
      IonicModule.forRoot(),
      RouterModule.forRoot([
          { path: 'user/:id', component: ProfileComponent },
          { path: '', redirectTo: '/', pathMatch: 'full'}
      ]),
      AppRoutingModule,
      AngularFireModule.initializeApp(config.firebaseConfig),
      CoreModule,
      BrowserAnimationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
