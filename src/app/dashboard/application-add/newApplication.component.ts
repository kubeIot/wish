/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {
  Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes,
  OnChanges
} from '@angular/core';
import {Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {NewApplicationService} from "./newApplication.service";
import {Location} from '@angular/common';
import {Device} from "../devices/devices.metadata";
import {Observable} from "rxjs";
import {DevicesService} from "../devices/devices.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ApplicationService} from "../Applications/applications.service";
import {Application} from "../Applications/applications.metadata";
import {AvailableCapabilities} from "./newApplication.metadata";
import * as _ from 'underscore';
import {Image} from "../images/images.metadata";
import {ImagesService} from "../images/images.service";


@Component({
  moduleId: module.id,
  selector: 'application-add',
  templateUrl: 'newApplication.component.html',
  styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
  providers: [NewApplicationService, DevicesService, ApplicationService, ImagesService],
  animations: [
    trigger('newapplication', [
      state('*', style({
        '-ms-transform': 'translate3D(0px, 0px, 0px)',
        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
        '-moz-transform': 'translate3D(0px, 0px, 0px)',
        '-o-transform': 'translate3D(0px, 0px, 0px)',
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out')
      ])
    ])
  ]
})

export class NewApplicationComponent implements OnInit {
  listOfDevices: Observable<Device[]>;
  filteredDevices: Device[];  //future use - filtering according to given image
  listOfImages: Observable<Image[]>;
  filteredImages: Image[]; //future use - filtering according to given device
  availableCapabilities: AvailableCapabilities[] = [];
  application: Application;
  public addApplicationForm: FormGroup;
  ipPattern = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";

  constructor(private _httpService: NewApplicationService,
              private _fb: FormBuilder,
              private location: Location,
              private deviceThumbService: DevicesService,
              private imagesService: ImagesService,
              private applicationService: ApplicationService,
              private route: ActivatedRoute,
              private newApplicationService: NewApplicationService) {

  }

  ngOnInit() {
    // application/images/devices ready
    var entitiesReady: Boolean[] = [false, false, false];

    // we will initialize our form here
    this.addApplicationForm = this._fb.group({
      base_image: ['', [Validators.required]],
      device_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      service_ip: ['', [Validators.required]],

      system_info: [''],

      ports: this._fb.array([
        this.initPort(),

      ]),
    });


    // first of all we need to get application, if application is set
    this.route.params
      .switchMap((params: Params) => this.applicationService.getApplication(+params['id']))
      // .subscribe(device => this.doMagic(device),
      .subscribe(application => {
        this.application = application;
        entitiesReady[0] = true;
        if(entitiesReady.every(item => item == true))
          this.setVariables()
      });


    this.listOfImages = this.addApplicationForm.valueChanges
      .startWith('')
      .debounce(() => Observable.interval(200))
      .distinctUntilChanged()
      .flatMap(term => this.imagesService.getImages());
    this.listOfImages.subscribe(images => {
      this.filteredImages = images;
      entitiesReady[1] = true;
      if(entitiesReady.every(item => item == true))
        this.setVariables()
    });

    this.listOfDevices = this.deviceThumbService.getDevices("");
     this.listOfDevices.subscribe(devices => {
       this.filteredDevices = devices;
       entitiesReady[2] = true;
       if(entitiesReady.every(item => item == true))
         this.setVariables()
     });

    // this.filteredDevices = this.addApplicationForm.valueChanges
    //   .startWith('')
    //   .debounce(() => Observable.interval(200))
    //   .distinctUntilChanged()
    //   .flatMap(term => this.getDevicesList(term, this.availableCapabilities));

  }

  getDevicesList(filter: any = "", capabilities: AvailableCapabilities[] = []): Observable<Device[]> {

    return this.listOfDevices;

  }


  //Any parameter - can be number or string
  setVariables() {

    var dev: Device = this.filteredDevices.filter(device => device.id == this.application.device_id)[0];
    var image: Image = this.filteredImages.filter(image => image.id == this.application.base_image)[0];

    this.addApplicationForm.patchValue({
      base_image: this.application.base_image+ " — " + image.name,
      device_id: this.application.device_id + " — " + dev.device_vendor,
      name: this.application.name,
      service_ip: this.application.service_ip,
      // system_info: application.system_info,
    });

    this.application.ports.forEach((item, index) => {
      this.addPort(item);
      if (index == 0)
        this.removePort(index);
    });

  }


  //finds available capabiltiies on device --
  // RE-DO this method after isused is found on backend on device capabilities

  // getAvailableCapabilities(devices: Device[]) {
  //
  //
  //   devices.forEach((device, index) => {
  //     var usedDevCapabilitiesIds: number[] = [];
  //     var availableDeviceCaps: string[] = [];
  //     var caps: any[] = [];
  //     device.used_capabilities.forEach((capability, index) => {
  //
  //       usedDevCapabilitiesIds[index] = capability.capability_id;
  //
  //     });
  //
  //
  //     availableDeviceCaps = device.installed_capabilities
  //       .filter(x => usedDevCapabilitiesIds.indexOf(Number(x)) < 0);
  //
  //     this.availableCapabilities[index] = {availableCapabilities: [], deviceId: null};
  //
  //
  //     this.availableCapabilities[index].availableCapabilities = availableDeviceCaps;
  //     this.availableCapabilities[index].deviceId = device.id;
  //
  //     // console.log(this.availableCapabilities);
  //
  //   });
  //
  // }


  //accepts strings as well as numbers

  initPort(value: number | string = "") {
    // initialize our port
    return this._fb.group({
      port: [value, Validators.required]
    });
  }

  addPort(value: any = "") {


    // add port to the list
    const control = <FormArray>this.addApplicationForm.controls['ports'];
    control.push(this.initPort(value));
  }

  removePort(i: number) {
    // remove port from the list
    const control = <FormArray>this.addApplicationForm.controls['ports'];
    control.removeAt(i);
  }


  //any because form doesnt have to include every app field.
  addApplication(application: any) {
    // call API to save application

    // getting id of the certain item.
    var splitValue = application.value.device_id.split(" — ");
    application.value.device_id = splitValue[0];

    splitValue = application.value.base_image.split(" — ");
    application.value.base_image = splitValue[0];


    this.newApplicationService.postApplication(application.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }

  editApplication(application: any, id: number | string) {
    var splitValue = application.value.device_id.split(" — ");
    application.value.device_id = splitValue[0];

    splitValue = application.value.base_image.split(" — ");
    application.value.base_image = splitValue[0];


    this.newApplicationService.putApplication(application.value, id).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }


  goBack(): void {
    this.location.back();
  }

}
