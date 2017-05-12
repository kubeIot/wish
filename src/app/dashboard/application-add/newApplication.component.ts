/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NewApplicationService } from "./newApplication.service";
import { Location } from '@angular/common';
import {Device} from "../device-thumbnail/deviceThumb.metadata";
import {Observable} from "rxjs";
import {DeviceThumbService} from "../device-thumbnail/deviceThumb.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ApplicationService} from "../Applications/applications.service";
import {Application} from "../Applications/applications.metadata";




@Component({
    moduleId: module.id,
    selector: 'application-add',
    templateUrl: 'newApplication.component.html',
    styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
    providers: [NewApplicationService, DeviceThumbService, ApplicationService],
    animations: [
        trigger('newapplication', [
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
        ])
    ]
})

export class NewApplicationComponent implements OnInit {
    listOfDevices: Observable<Device[]>;
  listOfImages: Observable<any[]>;
    application: Application;
    public addApplicationForm: FormGroup;
    ipPattern = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";
    constructor(private _httpService: NewApplicationService,
                private _fb: FormBuilder,
                private location: Location,
                private deviceThumbService: DeviceThumbService,
                private applicationService: ApplicationService,
                private route: ActivatedRoute,
                private newApplicationService: NewApplicationService) {

    }

    ngOnInit() {

        this.listOfDevices = this.deviceThumbService.getDevices("");
      this.listOfImages = this.applicationService.getImages();



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

        this.route.params
            .switchMap((params: Params) => this.applicationService.getApplication(+params['id']))
            // .subscribe(device => this.doMagic(device),
            .subscribe(application => this.setVariables(application),
                () => console.log("finished"));
        //
        // this.route.params
        //     .switchMap((params: Params) => this.applicationService.getApplication(+params['id']))
        //     // .subscribe(device => this.doMagic(device),
        //     .subscribe(application => this.application = application,
        //         () => console.log("finished"));
    }
    //Any parameter - can be number or string
    setVariables(application: Application) {
        this.application = application;
        this.addApplicationForm.patchValue({base_image: application.base_image,
            device_id: application.device_id,
            name: application.name,
            service_ip:application.service_ip,
           // system_info: application.system_info,
        });

        application.ports.forEach((item, index) => {
           this.addPort(item);
            if(index == 0)
                this.removePort(index);
        });

    }


    //accepts strings as well as numbers

    initPort(value: number | string  = "") {
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







    addApplication(application:any) {
        // call API to save application


      this.newApplicationService.postApplication(application.value).subscribe(
        data => console.log(data),
        error => alert(error),
        () => console.log("post request is completed")
      );
    }

  editApplication(application:any, id: number | string) {
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
