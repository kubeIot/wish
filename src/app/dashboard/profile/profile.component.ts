/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {UserService} from "./profile.service";
import {User} from "./profile.metadata";


@Component({
    moduleId: module.id,
    selector: '<profile>',
    templateUrl: 'profile.component.html',
    styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
    providers: [UserService],
    animations: [
        trigger('photo', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0s ease-out')
            ])
        ]),
        trigger('description', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0.25s ease-out')
            ])
        ])
    ]
})

export class ProfileComponent implements OnInit{

  user: User;
  showDevice: string; // showDevice has to be string, localstorage does not work with booleans
  showApplication: string;
  showCapability: string;
  showImage: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {}


  ngOnInit() {
    this.userService.getUser(1).subscribe(user => this.user = user);

    this.setCheckBoxes();
  }

  toggleItem(item: string){

    switch(item.toLowerCase()) {

      case 'device':
        if(this.showDevice == "true")
          this.showDevice = "false";
        else
          this.showDevice = "true";
        localStorage.setItem("showDevice", this.showDevice);
        break;

      case 'application':
        if(this.showApplication == "true")
          this.showApplication = "false";
        else
          this.showApplication = "true";
        localStorage.setItem("showApplication", this.showApplication);
        break;

      case 'capability':
        if(this.showCapability == "true")
          this.showCapability = "false";
        else
          this.showCapability = "true";
        localStorage.setItem("showCapability", this.showCapability);
        break;

      case 'image':
        if(this.showImage == "true")
          this.showImage = "false";
        else
          this.showImage = "true";
        localStorage.setItem("showImage", this.showImage);
        break;
    }
  }


  setCheckBoxes() {

    if (localStorage.getItem("showDevice") === null) {
      localStorage.setItem("showDevice", "true");
      this.showDevice = "true";
    }
    else
      this.showDevice = localStorage.getItem("showDevice");

    if (localStorage.getItem("showApplication") === null) {
      localStorage.setItem("showApplication", "true");
      this.showApplication = "true";
    }
    else
      this.showApplication = localStorage.getItem("showApplication");

    if (localStorage.getItem("showCapability") === null) {
      localStorage.setItem("showCapability", "true");
      this.showCapability = "true";
    }
    else
      this.showCapability = localStorage.getItem("showCapability");

    if (localStorage.getItem("showImage") === null) {
      localStorage.setItem("showImage", "true");
      this.showImage = "true";
    }
    else
      this.showImage = localStorage.getItem("showImage");

  }


  goBack(): void {
    this.location.back();
  }



}
