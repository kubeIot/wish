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
import {LoginComponent} from "../login/login/login.component";
import {ApplicationsComponent} from "./Applications/applications.component";
import {authComponent} from "../auth/auth.component";

export const MODULE_COMPONENTS = [
    AboutComponent,
    EventsLogComponent,
    NewDeviceComponent,
    ProfileComponent,
    DeviceThumbComponent,
    DashboadrComponent,
    DevicesComponent,
    DeviceProfileComponent,
    LoginComponent,
    ApplicationsComponent,
    testComponent,
    authComponent
]

export const MODULE_ROUTES: Route[] =[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'events-log', component: EventsLogComponent },
    { path: 'devices', component: DevicesComponent},
    { path: 'device-add', component: NewDeviceComponent},
    { path: 'device-profile/:id', component: DeviceProfileComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboadrComponent },
    { path: 'login', component: LoginComponent },
    { path: 'applications', component: ApplicationsComponent },
    { path: 'test', component: testComponent },
    { path: 'test/test1', component: testComponent },
    { path: 'test/test2', component: testComponent },
    { path: 'test/test3', component: testComponent },
    { path: 'auth', component: authComponent },

    { path: '**', redirectTo: '/dashboard' }


]
