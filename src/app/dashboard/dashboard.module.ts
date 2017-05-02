import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {AlertModule} from "../authentication/alert/alert.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        AlertModule,
        ReactiveFormsModule,
        RouterModule.forChild(MODULE_ROUTES),
        Ng2Bs3ModalModule
    ],
    declarations: [  MODULE_COMPONENTS ]
})

export class DashboardModule{}
