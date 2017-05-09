/**
 * Created by skylele on 3.3.17.
 */
export interface Ids {
  application_id: number;  // required field
  capability_id: number;
}

export interface DeviceEvent {
  event_message: string;
  event_timestamp: string;
  event_type: string;
  id: number;
  parent_id: number;
}

export interface Device {
    adress: string;
    applications: string[];
    device_vendor: string;
    device_version: string;
    id: number;
    installed_capabilities: string[];
    kernel_version: string;
    number_of_applications: number;
    os_distribution: string;
    owner: number;
    system_info: string;
    used_capabilities: Ids[];
}
// export interface RootObject {
//     applications: number[];
//     device_vendor: string;
//     id: number;
//     installed_capabilities: number[];
//     kernel_version: string;
//     os_distribution: string;
//     owner: number;
//     system_info: string;
//     used_capabilities: any[];
// }
