import {Component, OnInit, trigger, state, style, transition, animate, keyframes, group, DoCheck} from '@angular/core';
import {Device} from "../devices/devices.metadata";
import {DevicesService} from "../devices/devices.service";
import {ApplicationService} from "../Applications/applications.service";
import {Application} from "../Applications/applications.metadata";
// import initDemo = require('../../../assets/js/charts.js');
// import initNotify = require('../../../assets/js/notify.js');


// declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
  providers: [DevicesService, ApplicationService ],
  styleUrls: [ '../../../assets/css/app.css'],
  animations: [
        trigger('dashboard', [
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
                animate('0.3s 0.0s ease-out')
            ])
        ])
    ]


})

export class DashboadrComponent implements OnInit{
  devices: Device[];
  applications: Application[];
  numberOfApplications: number;
  numberOfErrorApplications: number = 0;
  numberOfRunningApplications: number = 0;
  numberOfDevices: number;
  numberOfErrorDevices: number = 0;
  numberOfRunningDevices: number = 0;

  //Needs to be set true if data are available.
  //Other option how to make graphs show data correctly is using onchange method
  // onchange is harder to compute but can provide live data, for now - only static data are present
  applicationDataAvailable: Boolean = false;
  deviceDataAvailable: Boolean = false;


  // Graph Information
  public applicationLabels:string[] = ['Error', 'Without Error'];
  public applicationData:number[] = [];
  public deviceLabels:string[] = ['Error', 'Without Error'];
  public deviceData:number[] = [];


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }






  constructor(private deviceThumbService: DevicesService,
              private applicationService: ApplicationService){

  }


  ngOnInit() {


    this.deviceThumbService.getDevices().subscribe(
      devices => {this.getDeviceInformation(devices)}
    );

    this.applicationService.getApplications().subscribe(
      applications => this.getApplicationInformation(applications)
    );

  }


  getDeviceInformation(devices: Device[]) {
    //set all information about Devices - for future use, set also information about graphs!
    this.devices = devices;

    this.numberOfDevices = devices.length;
    devices.forEach(item => {
      if(item.system_info == null || item.system_info.toLowerCase() != "running")
        this.numberOfErrorDevices++;
      else
        this.numberOfRunningDevices++;
    });

    //setting information about graphs
    this.deviceData[0] = this.numberOfErrorDevices;
    this.deviceData[1] = this.numberOfRunningDevices;
    this.deviceDataAvailable = true;



  }

  getApplicationInformation(applications: Application[]) {
    //set all information about Applications - for future use, set also information about graphs!

    this.applications = applications;
      this.numberOfApplications = applications.length;

      applications.forEach(item => {
        if(item.status_message == null || item.status_message.toLowerCase() != "ok")
          this.numberOfErrorApplications++;
        else
          this.numberOfRunningApplications++;
      });

      //information about graphs
    this.applicationData[0] = this.numberOfErrorApplications;
    this.applicationData[1] = this.numberOfRunningApplications;


    this.applicationDataAvailable = true;


  }





}
