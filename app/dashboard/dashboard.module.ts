import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {AlertModule} from "../login/alert/alert.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        AlertModule,
        ReactiveFormsModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [  MODULE_COMPONENTS ]
})

export class DashboardModule{}
