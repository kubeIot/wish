"use strict";
(function (MenuType) {
    MenuType[MenuType["BRAND"] = 0] = "BRAND";
    MenuType[MenuType["LEFT"] = 1] = "LEFT";
    MenuType[MenuType["RIGHT"] = 2] = "RIGHT";
})(exports.MenuType || (exports.MenuType = {}));
var MenuType = exports.MenuType;
exports.ROUTES = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'pe-7s-graph' },
    { path: 'devices', title: 'Devices', menuType: MenuType.LEFT, icon: 'pe-7s-config' },
    { path: 'events-log', title: 'Events log', menuType: MenuType.LEFT, icon: 'pe-7s-note2' },
    { path: 'applications', title: 'Applications', menuType: MenuType.LEFT, icon: 'pe-7s-plugin' },
    { path: 'device-add', title: 'New device', menuType: MenuType.LEFT, icon: 'pe-7s-plus' },
    { path: 'about', title: 'About', menuType: MenuType.LEFT, icon: 'pe-7s-info' },
    { path: 'test', title: 'Test', menuType: MenuType.LEFT, icon: 'pe-7s-attention' },
    { path: 'auth', title: 'Auth - TEST', menuType: MenuType.LEFT, icon: 'pe-7s-attention' },
    { path: 'profile', title: 'Profile', menuType: MenuType.BRAND, icon: '' },
    { path: 'device-profile', title: 'Device Profile', menuType: MenuType.BRAND, icon: '' },
    { path: 'login', title: 'Login', menuType: MenuType.BRAND, icon: '' },
];
//# sourceMappingURL=sidebar-routes.config.js.map