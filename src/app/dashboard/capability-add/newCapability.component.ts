/**
 * Created by skytzi on 6.5.17.
 */
/**
 * Created by skylele on 13.4.17.
 */
/**
 * Created by skylele on 5.3.17.
 */
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import {ActivatedRoute, Params} from "@angular/router";
import {CapabilitiesService} from "../Capabilities/capabilities.service";
import {Capability} from "../Capabilities/capabilities.metadata";
import {NewCapabilityService} from "./newCapabilityService";





@Component({
  moduleId: module.id,
  selector: 'capability-add',
  templateUrl: 'newCapability.component.html',
  styleUrls: ['../../../assets/css/app.css', '../../../assets/css/device.css'],
  providers: [NewCapabilityService, CapabilitiesService],
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

export class NewCapabilityComponent implements OnInit {
  capability: Capability;
  public addCapabilityForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private location: Location,
              private capabilitiesService: CapabilitiesService,
              private newCapabilityService: NewCapabilityService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {


    // we will initialize our form here
    this.addCapabilityForm = this._fb.group({
      name: ['', [Validators.required]],
      peripherial_device: ['', [Validators.required]],
      protocol: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });

    this.route.params
      .switchMap((params: Params) => this.capabilitiesService.getCapability(+params['id']))
      .subscribe(capability => this.setVariables(capability),
        (err) => this.addCapabilityForm.patchValue({id: 0}),

    () => console.log("finished"));

  }
  //Any parameter - can be number or string
  setVariables(capability: Capability) {
    this.capability = capability;
    this.addCapabilityForm.patchValue({name: capability.name,
      peripherial_device: capability.peripherial_device,
      protocol: capability.protocol,
      id: capability.id,
      // system_info: application.system_info,
    });

  }



  addCapability(capability:any) {
    // call API to save capabiity

    //console.log(JSON.stringify(capability._value));
    this.newCapabilityService.postCapability(capability.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }

  editCapability(capability: any)  {
    this.newCapabilityService.putCapability(capability.value).subscribe(
      data => console.log(data),
      error => alert(error),
      () => console.log("post request is completed")
    );
  }

  goBack(): void {
    this.location.back();
  }

}
