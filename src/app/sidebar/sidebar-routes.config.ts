export enum MenuType {
    BRAND,
    LEFT,
    RIGHT
}

export interface RouteInfo {
    path: string;
    title: string;
    menuType: MenuType;
    icon: string;
}


export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'pe-7s-graph' },
    { path: 'devices', title: 'Devices', menuType: MenuType.LEFT, icon:'pe-7s-config' },
    // { path: 'events-log', title: 'Events log', menuType: MenuType.LEFT, icon:'pe-7s-note2' },
    { path: 'applications', title: 'Applications', menuType: MenuType.LEFT, icon:'pe-7s-plugin' },
   { path: 'capabilities', title: 'Capabilities', menuType: MenuType.LEFT, icon:'pe-7s-usb' },
  { path: 'images', title: 'Images', menuType: MenuType.LEFT, icon:'pe-7s-disk' },


  { path: 'device-add', title: 'New Device', menuType: MenuType.LEFT, icon:'pe-7s-plus' },
  { path: 'application-add', title: 'New Application', menuType: MenuType.LEFT, icon:'pe-7s-plus' },
  { path: 'capability-add', title: 'New Capability', menuType: MenuType.LEFT, icon:'pe-7s-plus' },
  { path: 'about', title: 'About', menuType: MenuType.LEFT, icon:'pe-7s-info' },
    { path: 'test', title: 'Test', menuType: MenuType.LEFT, icon:'pe-7s-attention' },
    { path: 'profile', title: 'Profile', menuType: MenuType.BRAND, icon:'' },
    { path: 'device-profile', title: 'Device Profile', menuType: MenuType.BRAND, icon:'' },
    { path: 'login', title: 'Login', menuType: MenuType.BRAND, icon:'' },


];
