"use strict";
var deviceThumb_component_1 = require("./device-thumbnail/deviceThumb.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var devices_component_1 = require("./devices/devices.component");
var deviceProfile_component_1 = require("./device-profile/deviceProfile.component");
var eventsLog_component_1 = require("./events-log/eventsLog.component");
var newDevice_component_1 = require("./device-add/newDevice.component");
var about_component_1 = require("./about/about.component");
var profile_component_1 = require("./profile/profile.component");
var test_component_1 = require("./Ztest/test.component");
var login_component_1 = require("../login/login/login.component");
var applications_component_1 = require("./Applications/applications.component");
var auth_component_1 = require("../auth/auth.component");
exports.MODULE_COMPONENTS = [
    about_component_1.AboutComponent,
    eventsLog_component_1.EventsLogComponent,
    newDevice_component_1.NewDeviceComponent,
    profile_component_1.ProfileComponent,
    deviceThumb_component_1.DeviceThumbComponent,
    dashboard_component_1.DashboadrComponent,
    devices_component_1.DevicesComponent,
    deviceProfile_component_1.DeviceProfileComponent,
    login_component_1.LoginComponent,
    applications_component_1.ApplicationsComponent,
    test_component_1.testComponent,
    auth_component_1.authComponent
];
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'events-log', component: eventsLog_component_1.EventsLogComponent },
    { path: 'devices', component: devices_component_1.DevicesComponent },
    { path: 'device-add', component: newDevice_component_1.NewDeviceComponent },
    { path: 'device-profile/:id', component: deviceProfile_component_1.DeviceProfileComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboadrComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'applications', component: applications_component_1.ApplicationsComponent },
    { path: 'test', component: test_component_1.testComponent },
    { path: 'test/test1', component: test_component_1.testComponent },
    { path: 'test/test2', component: test_component_1.testComponent },
    { path: 'test/test3', component: test_component_1.testComponent },
    { path: 'auth', component: auth_component_1.authComponent },
    { path: '**', redirectTo: '/dashboard' }
];
//# sourceMappingURL=dashboard.routes.js.map