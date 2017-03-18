/**
 * Created by skylele on 5.3.17.
 */


import { Component,OnInit,  NgModule, TemplateRef, ViewChild } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {testService} from "./test.service";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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
})

export class testComponent implements OnInit {




    public addDeviceForm: FormGroup;
    getData: string;
    postData: string;

    constructor(private _httpService: testService, private _fb: FormBuilder) {

    }





    ngOnInit() {
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
                data => this.getData = JSON.stringify(data),
                error => alert(error),
                () => console.log("get request is completed")
            );
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
