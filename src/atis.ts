import * as moment from 'moment';
import { Client } from './client';

export class Atis extends Client {
  constructor(
    public callsign: string,
    public cid: string,
    public realname: string,
    clienttype: string,
    public frequency: string,
    public latitude: number,
    public longitude: number,
    public altitude: string,
    groundspeed: number,
    planned_aircraft: string,
    planned_tascruise: number,
    planned_depairport: string,
    planned_altitude: string,
    planned_destairport: string,
    public server: string,
    public protrevision: number,
    public rating: number,
    transponder: string,
    public facilitytype: number,
    visualrange: number,
    planned_revision: string,
    planned_flighttype: string,
    planned_deptime: string,
    planned_actdeptime: string,
    planned_hrsenroute: string,
    planned_minenroute: string,
    planned_hrsfuel: string,
    planned_minfuel: string,
    planned_altairport: string,
    planned_remarks: string,
    planned_route: string,
    planned_depairport_lat: number,
    planned_depairport_lon: number,
    planned_destairport_lat: number,
    planned_destairport_lon: number,
    public atis_message: string,
    public time_last_atis_received: moment.Moment,
    public time_logon: moment.Moment,
    heading: number,
    QNH_iHg: number,
    QNH_Mb: number
  ) {
    super(callsign, cid, realname, clienttype, frequency, latitude, longitude, altitude, groundspeed, planned_aircraft, planned_tascruise, planned_depairport, planned_altitude, planned_destairport, server, protrevision, rating, transponder, facilitytype, visualrange, planned_revision, planned_flighttype, planned_deptime, planned_actdeptime, planned_hrsenroute, planned_minenroute, planned_hrsfuel, planned_minfuel, planned_altairport, planned_remarks, planned_route, planned_depairport_lat, planned_depairport_lon, planned_destairport_lat, planned_destairport_lon, atis_message, time_last_atis_received, time_logon, heading, QNH_iHg, QNH_Mb);
  }
}