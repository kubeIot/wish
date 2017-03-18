/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['../../../assets/css/app.css' ], //'../../../assets/css/about.component.css'
    animations: [
        trigger('about', [
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out', style({opacity: 1,
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform':'translate3D(0px, 0px, 0px)',
                    transform:'translate3D(0px, 0px, 0px)',
                }),)
            ])
        ])
    ]
})

export class AboutComponent{ }
