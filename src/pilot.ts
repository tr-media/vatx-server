import * as moment from 'moment';
import { Client } from './client';

export class Pilot extends Client {
  constructor(
    public callsign: string,
    public cid: string,
    public realname: string,
    public clienttype: string,
    frequency: string,
    public latitude: number,
    public longitude: number,
    public altitude: string,
    public groundspeed: number,
    public planned_aircraft: string,
    public planned_tascruise: number,
    public planned_depairport: string,
    public planned_altitude: string,
    public planned_destairport: string,
    public server: string,
    public protrevision: number,
    public rating: number,
    public transponder: string,
    facilitytype: number,
    visualrange: number,
    public planned_revision: string,
    public planned_flighttype: string,
    public planned_deptime: string,
    public planned_actdeptime: string,
    public planned_hrsenroute: string,
    public planned_minenroute: string,
    public planned_hrsfuel: string,
    public planned_minfuel: string,
    public planned_altairport: string,
    public planned_remarks: string,
    public planned_route: string,
    public planned_depairport_lat: number,
    public planned_depairport_lon: number,
    public planned_destairport_lat: number,
    public planned_destairport_lon: number,
    public atis_message: string,
    public time_last_atis_received: moment.Moment,
    public time_logon: moment.Moment,
    public heading: number,
    public QNH_iHg: number,
    public QNH_Mb: number
  ) {
    super(callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb);
  }
}