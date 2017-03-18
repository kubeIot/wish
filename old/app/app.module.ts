import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './inMemoryDataService.service';
// all components
import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device/device.component';
import { eventsLogComponent } from './eventsLog.component';

// device profile
import { DeviceProfileComponent } from './device/deviceProfile.component';
// device folder
import { DeviceThumbComponent } from './device/deviceThumb.component';
// device add
import { DeviceAddComponent } from './device/deviceAdd.component';
// about
import {AboutComponent} from "./about.component";
// profil
import {ProfileComponent} from "./profile.component";
/*FIXME: http://valor-software.com/ng2-charts/ */
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BarChartComponent } from './charts.component';
//test
import {apijsontestComponent} from "./ApiCallTest.component"
import {DeviceThumbService} from "./device/deviceThumb.service";



@NgModule({
  imports:      [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
      AppComponent,
      DashboardComponent,
      ProfileComponent,
      DeviceComponent,
      eventsLogComponent,
      DeviceThumbComponent,
      DeviceAddComponent,
      DeviceProfileComponent,
      apijsontestComponent,
      AboutComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ DeviceThumbService ]
})


export class AppModule { }

