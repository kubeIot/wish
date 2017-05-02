/**
 * Created by skylele on 8.3.17.
 */
/**
 * Created by skylele on 8.3.17.
 */
import { NgModule } from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AlertService} from "./alert.service";


@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ AlertComponent ],
    exports: [ AlertComponent ],
    providers: [ AlertService ]
})
export class AlertModule{}
