/**
 * Created by skylele on 27.3.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {Auth} from "./auth.service";

@Component({
    moduleId: module.id,
    selector: 'auth',
    templateUrl: 'auth.component.html',
    providers: [Auth],
    styleUrls: ['../../assets/css/app.css' ], //'../../../assets/css/about.component.css'
})

export class authComponent{

    constructor(private auth: Auth) {}

}
