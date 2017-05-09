/**
 * Created by skytzi on 8.5.17.
 */
export interface User {
  account_created: number;
  devices: number[];
  email: string;
  email_verified: Boolean;
  username: string;
  id: number;
  last_logged_in: string;
}
