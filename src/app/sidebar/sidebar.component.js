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
var core_1 = require("@angular/core");
var sidebar_routes_config_1 = require("./sidebar-routes.config");
var sidebar_routes_config_2 = require("./sidebar-routes.config");
var Rx_1 = require("rxjs/Rx");
var common_1 = require("@angular/common");
var SidebarComponent = (function () {
    function SidebarComponent(location) {
        this.name = 'Angular';
        this.today = new Date();
        this.isCollapsed = true;
        this.loggedIn = localStorage.getItem('isLoggedIn');
    }
    SidebarComponent.prototype.ngDoCheck = function () {
        this.loggedIn = localStorage.getItem('isLoggedIn');
    };
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = Rx_1.Observable.timer(1000, 1000);
        timer.subscribe(function (t) { return _this.today = new Date(); });
        this.menuItems = sidebar_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType !== sidebar_routes_config_2.MenuType.BRAND; });
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sidebar-cmp',
        templateUrl: 'sidebar.component.html',
    }),
    __metadata("design:paramtypes", [common_1.Location])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map