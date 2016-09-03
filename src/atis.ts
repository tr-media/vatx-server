import * as moment from 'moment';
import { Client } from './client';

export class Atis extends Client {
  public callsign: string;
  public cid: string;
  public realname: string;
  public frequency: string;
  public latitude: number;
  public longitude: number;
  public altitude: number;
  public server: string;
  public protrevision: number;
  public rating: number;
  public facilitytype: number;
  public atis_message: string;
  public time_last_atis_received: moment.Moment;
  public time_logon: moment.Moment;

  constructor(data: string[]) {
    super(data);
  }
}