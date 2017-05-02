/**
 * Created by skylele on 7.3.17.
 */

import {
  Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes,
  DoCheck
} from '@angular/core';
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

export class LoginComponent implements OnInit, DoCheck{
    model: any = {};
    register = "";
    loading = false;
    returnUrl: string;
    currentUser: any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.currentUser = {
            login: '',
            password: ''
        }
    }

    ngDoCheck() {
      this.register = localStorage.getItem('register');

    }
    ngOnInit() {

    }

    login() {
        console.log(this.currentUser);
        localStorage.setItem('isLoggedIn', 'true');
    }

  newRegistration() {
    console.log(this.currentUser);
  }



}
