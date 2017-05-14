/**
 * Created by skylele on 7.3.17.
 */

import {
  Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes,
  DoCheck
} from '@angular/core';
// import {AlertService} from "../alert/alert.service";
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [LoginService],
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
    dataFromLogin: string;
  public loginForm: FormGroup;
  public registerForm: FormGroup;




  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private _fb: FormBuilder
        // private authenticationService: AuthenticationService,
    ) {
        this.currentUser = {
            login: '',
            password: ''
        }
    }

    ngDoCheck() {
      this.register = localStorage.getItem('register');

    }
    ngOnInit() {

      this.loginForm = this._fb.group({
        login: [''],
        password: [''],
      });

      this.registerForm = this._fb.group({
        login: [''],
        password: [''],
        password_confirm: [''],
        email: ['']
      });

    }

    login(credentials :any) {
      this.loginService.postLogin(credentials.value)
        .subscribe(
          data => {this.dataFromLogin = JSON.stringify(data)
          //save access token to storage
            // save other values provided by endpoint.... enpoint not implemented yet :/
            },
          error => console.log(error + "Endpoint not available!")
        );

         localStorage.setItem('isLoggedIn', 'true');
         localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ');
         this.router.navigateByUrl('/');

    }


  registerUser(credentials :any) {
    this.loginService.postRegister(credentials.value)
      .subscribe(
        data => {this.dataFromLogin = JSON.stringify(data)
        //save access token to storage
          // save other values provided by endpoint.... enpoint not implemented yet :/
          },
        error => alert(error + "\nEndpoint not available!")
      );

    // localStorage.setItem('isLoggedIn', 'true');
    // this.router.navigateByUrl('/');

  }

  // onTestPost() {
  //   console.log("post request starting");
  //   this._httpService.postJSON()
  //     .subscribe(
  //       data => this.postData = JSON.stringify(data),
  //       error => alert(error),
  //       () => console.log("post request is completed")
  //     )
  // }




}
