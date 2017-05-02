"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by skylele on 8.3.17.
 */
/**
 * Created by skylele on 8.3.17.
 */
var core_1 = require("@angular/core");
var alert_component_1 = require("../alert/alert.component");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var alert_service_1 = require("./alert.service");
var AlertModule = (function () {
    function AlertModule() {
    }
    return AlertModule;
}());
AlertModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule, common_1.CommonModule],
        declarations: [alert_component_1.AlertComponent],
        exports: [alert_component_1.AlertComponent],
        providers: [alert_service_1.AlertService]
    })
], AlertModule);
exports.AlertModule = AlertModule;
//# sourceMappingURL=alert.module.js.map