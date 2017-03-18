/**
 * Created by skylele on 7.3.17.
 */

import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {AlertService} from "../alert/alert.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    // styleUrls: ['../../../assets/css/app.css' ], //'../../../assets/css/about.component.css'
    animations: [
        trigger('login', [
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

export class LoginComponent implements OnInit{
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // // reset login status
        // this.authenticationService.logout();
        //
        // // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        // this.loading = true;
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error._body);
        //             this.loading = false;
        //         });
    }


}
