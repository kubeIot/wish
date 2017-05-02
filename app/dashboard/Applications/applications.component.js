"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by skylele on 14.3.17.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var applications_service_1 = require("./applications.service");
var ApplicationsComponent = (function () {
    function ApplicationsComponent(applicationService) {
        this.applicationService = applicationService;
        this.searchNameInput = new forms_1.FormControl();
        this.sortItem = "device_vendor";
        this.revert = false;
        this.tableView = true;
    }
    ApplicationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applications = this.searchNameInput.valueChanges
            .startWith('')
            .debounce(function () { return rxjs_1.Observable.interval(200); })
            .distinctUntilChanged()
            .flatMap(function (term) { return _this.applicationService.getApplications(term); });
    };
    ApplicationsComponent.prototype.changeLayout = function () {
        this.tableView = !this.tableView;
    };
    ApplicationsComponent.prototype.changeSort = function (sort) {
        if (this.sortItem == sort)
            this.revert = !this.revert;
        else
            this.sortItem = sort;
    };
    return ApplicationsComponent;
}());
ApplicationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'applications',
        providers: [applications_service_1.ApplicationService],
        templateUrl: 'applications.component.html',
        styleUrls: ['../../../assets/css/app.css'],
        animations: [
            core_1.trigger('applications', [
                core_1.state('*', core_1.style({
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform': 'translate3D(0px, 0px, 0px)',
                    transform: 'translate3D(0px, 0px, 0px)',
                    opacity: 1
                })),
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform': 'translate3D(0px, 150px, 0px)',
                        transform: 'translate3D(0px, 150px, 0px)',
                    }),
                    core_1.animate('0.3s 0s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [applications_service_1.ApplicationService])
], ApplicationsComponent);
exports.ApplicationsComponent = ApplicationsComponent;
//# sourceMappingURL=applications.component.js.map