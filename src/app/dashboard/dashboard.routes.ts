import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {DeviceThumbComponent} from "./device-thumbnail/deviceThumb.component";
import {DashboadrComponent} from "./dashboard/dashboard.component";
import {DevicesComponent} from "./devices/devices.component";
import {DeviceProfileComponent} from "./device-profile/deviceProfile.component";
import {EventsLogComponent} from "./events-log/eventsLog.component";
import {NewDeviceComponent} from "./device-add/newDevice.component";
import {AboutComponent} from "./about/about.component";
import {ProfileComponent} from "./profile/profile.component";
import {testComponent} from "./Ztest/test.component";
import {LoginComponent} from "../authentication/login/login.component";
import {ApplicationsComponent} from "./Applications/applications.component";
import {sortPipe} from "./sorting.pipe";
import {ApplicationThumbComponent} from "./application-thumbnail/applicationThumb.component";
import {NewApplicationComponent} from "./application-add/newApplication.component";
import {ApplicationProfileComponent} from "./application-profile/applicationProfile.component";
import {CapabilitiesComponent} from "./Capabilities/capabilities.component";
import {NewCapabilityComponent} from "./capability-add/newCapability.component";
import {ImagesComponent} from "./images/images.component";
import { SwitchComponent } from 'angular2-bootstrap-switch/components';

export const MODULE_COMPONENTS = [
    AboutComponent,
    EventsLogComponent,
    NewDeviceComponent,
    NewApplicationComponent,
    NewCapabilityComponent,
    ProfileComponent,
    DeviceThumbComponent,
    ApplicationThumbComponent,
    ImagesComponent,
    DashboadrComponent,
    DevicesComponent,
    DeviceProfileComponent,
    ApplicationProfileComponent,
    CapabilitiesComponent,
    // LoginComponent,
    ApplicationsComponent,
    testComponent,
    sortPipe,
  SwitchComponent

]

export const MODULE_ROUTES: Route[] =[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'events-log', component: EventsLogComponent },
    { path: 'capabilities', component: CapabilitiesComponent },
    { path: 'devices', component: DevicesComponent},
  { path: 'images', component: ImagesComponent},


  { path: 'capability-add', component: NewCapabilityComponent},
  { path: 'capability-add/:id', component: NewCapabilityComponent},

  { path: 'device-add', component: NewDeviceComponent},
    { path: 'device-add/:id', component: NewDeviceComponent},
    { path: 'application-add', component: NewApplicationComponent},
    { path: 'application-add/:id', component: NewApplicationComponent},
    { path: 'device-profile/:id', component: DeviceProfileComponent },
    { path: 'application-profile/:id', component: ApplicationProfileComponent },

    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboadrComponent },
    // { path: 'authentication', component: LoginComponent },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'test', component: testComponent },
    { path: 'test/test1', component: testComponent },
    { path: 'test/test2', component: testComponent },
    { path: 'test/test3', component: testComponent },

    { path: '**', redirectTo: '/dashboard' }


]
