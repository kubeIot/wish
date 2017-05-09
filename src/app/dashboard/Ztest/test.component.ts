/**
 * Created by skylele on 5.3.17.
 */


import { Component,OnInit,  NgModule, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {testService} from "./test.service";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Device} from '../device-thumbnail/deviceThumb.metadata'
import {Router} from "@angular/router";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {IMyOptions} from 'mydatepicker';

export interface Customer {
    name: string; // required field with minimum 5 characters
    orders: string[];
    addresses: Address[]; // user can have one or more addresses
}

export interface Address {
    street: string;  // required field
    postcode: string;
}

@Component({
    moduleId: module.id,
    selector: 'test',
    templateUrl: 'test.component.html',
    styleUrls: ['../../../assets/css/app.css'],
    providers: [testService],
    encapsulation: ViewEncapsulation.None,
  host: {
    '[style.height.px]':'0.1 * height'
    }
})

export class testComponent implements OnInit {

  height: number = window.screen.height;
  @ViewChild('modal')
  modal: ModalComponent;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;
  output: string;
  //model: Person = new Person();

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;



  open() {
    this.modal.open();

  }

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  private myForm: FormGroup;

  setDate(): void {
    // Set today date using the setValue function
    let date = new Date();
    this.myForm.setValue({myDate: {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
  }

  clearDate(): void {
    // Clear the date using the setValue function
    this.myForm.setValue({myDate: null});
  }


    constructor(private router: Router,
                private _httpService: testService, private _fb:
                  FormBuilder, private formBuilder: FormBuilder) {
    }


    device : Device;
    public addDeviceForm: FormGroup;
    getData: any;
    postData: string;








    ngOnInit() {

      this.myForm = this.formBuilder.group({
        // Empty string or null means no initial value. Can be also specific date for
        // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
        // value.

        myDate: [null, Validators.required]
        // other controls are here...
      });

        // we will initialize our form here
        this.addDeviceForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([
                this.initAddress(),

            ]),
            orders: this._fb.array([
                this.initOrder(),
            ])

        });
    }

    initOrder() {
        // initialize our order
        return this._fb.group({
            order: ['', Validators.required]
        });
    }
    addOrder() {
        // add order to the list
        const control = <FormArray>this.addDeviceForm.controls['orders'];
        control.push(this.initOrder());
    }

    removeOrder(j: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['orders'];
        control.removeAt(j);
    }

    initAddress() {
        // initialize our address
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }

    addAddress() {
        // add address to the list
        const control = <FormArray>this.addDeviceForm.controls['addresses'];
        control.push(this.initAddress());
    }


    removeAddress(i: number) {
        // remove address from the list
        const control = <FormArray>this.addDeviceForm.controls['addresses'];
        control.removeAt(i);
    }



    save(model:any) {
        // call API to save customer

        console.log(JSON.stringify(model._value));
    }








    onTestGet() {
        console.log("get request starting");
        this._httpService.getCurrentTime()
            // .subscribe(data => this.getData = JSON.stringify(data));
                .subscribe(
                data => this.getData = data,
                error => alert(error),
                () => console.log("get request is completed")
            );

        console.log(this.getData);;
        console.log("get request is completed");
    }




    onTestPost() {
        console.log("post request starting");
        this._httpService.postJSON()
            .subscribe(
                data => this.postData = JSON.stringify(data),
                error => alert(error),
                () => console.log("post request is completed")
            )
    }
}

export class Person {
    firstName: string;
    lastName: string;
}
