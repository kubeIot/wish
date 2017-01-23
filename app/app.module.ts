import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes }   from '@angular/router';

// all components
import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard.component';
import { DeviceComponent } from './device.component';
import { eventsLogComponent } from './eventsLog.component';

// device folder
import { DeviceThumbComponent } from './device/deviceThumb.component';
// device add
import { DeviceAddComponent } from './device/deviceAdd.component';
// about
import {AboutComponent} from "./about.component";
/*FIXME: http://valor-software.com/ng2-charts/ */
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { BarChartComponent } from './charts.component';




const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'events-log', component: eventsLogComponent },
    { path: 'device-add', component: DeviceAddComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  imports:      [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
  ],
  declarations: [
      AppComponent,
      DashboardComponent,
      DeviceComponent,
      eventsLogComponent,
      DeviceThumbComponent,
      DeviceAddComponent,
      AboutComponent
  ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { }

