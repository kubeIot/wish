/**
 * Created by skytzi on 14.5.17.
 */
export interface Image {
  base_image: string;
  description: string;
  exposed_ports: string[];
  id: number;
  name: string;
  required_capabilities: number[];
}
