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
var sidebar_routes_config_1 = require("../../sidebar/sidebar-routes.config");
var common_1 = require("@angular/common");
var NavbarComponent = (function () {
    function NavbarComponent(location) {
        this.location = location;
        this.loggedIn = localStorage.getItem('isLoggedIn');
    }
    NavbarComponent.prototype.ngDoCheck = function () {
        this.loggedIn = localStorage.getItem('isLoggedIn');
    };
    NavbarComponent.prototype.ngOnInit = function () {
        // this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
        this.listTitles = sidebar_routes_config_1.ROUTES;
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if ((this.listTitles[item].path).substring(0, this.listTitles[item].path.length - 3) === titlee.substring(0, titlee.length - 3)) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    };
    NavbarComponent.prototype.logout = function () {
        this.loggedIn = false;
        localStorage.removeItem("isLoggedIn");
        // location.reload();
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navbar-cmp',
        templateUrl: 'navbar.component.html',
        styleUrls: ['../../../assets/css/navbar.css']
    }),
    __metadata("design:paramtypes", [common_1.Location])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map