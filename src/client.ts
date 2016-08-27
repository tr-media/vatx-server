import * as moment from 'moment';

export class Client {
  constructor(
    callsign: string,
    cid: string,
    realname: string,
    clienttype: string,
    frequency: string,
    latitude: number,
    longitude: number,
    altitude: string,
    groundspeed: number,
    planned_aircraft: string,
    planned_tascruise: number,
    planned_depairport: string,
    planned_altitude: string,
    planned_destairport: string,
    server: string,
    protrevision: number,
    rating: number,
    transponder: string,
    facilitytype: number,
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
    atis_message: string,
    time_last_atis_received: moment.Moment,
    time_logon: moment.Moment,
    heading: number,
    QNH_iHg: number,
    QNH_Mb: number
  ) { }
}