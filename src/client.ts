import * as moment from 'moment';
const fieldNames: string[] = 'callsign:cid:realname:clienttype:frequency:latitude:longitude:altitude:groundspeed:planned_aircraft:planned_tascruise:planned_depairport:planned_altitude:planned_destairport:server:protrevision:rating:transponder:facilitytype:visualrange:planned_revision:planned_flighttype:planned_deptime:planned_actdeptime:planned_hrsenroute:planned_minenroute:planned_hrsfuel:planned_minfuel:planned_altairport:planned_remarks:planned_route:planned_depairport_lat:planned_depairport_lon:planned_destairport_lat:planned_destairport_lon:atis_message:time_last_atis_received:time_logon:heading:QNH_iHg:QNH_Mb:'.split(':');

export class Client {
  callsign: string = '';
  cid: string = '';
  realname: string = '';
  clienttype: string = '';
  frequency: string = '';
  latitude: number = 0;
  longitude: number = 0;
  altitude: number = 0;
  groundspeed: number = 0;
  planned_aircraft: string = '';
  planned_tascruise: number = 0;
  planned_depairport: string = '';
  planned_altitude: string = '';
  planned_destairport: string = '';
  server: string = '';
  protrevision: number = 0;
  rating: number = 0;
  transponder: string = '';
  facilitytype: number = 0;
  visualrange: number = 0;
  planned_revision: string = '';
  planned_flighttype: string = '';
  planned_deptime: string = '';
  planned_actdeptime: string = '';
  planned_hrsenroute: string = '';
  planned_minenroute: string = '';
  planned_hrsfuel: string = '';
  planned_minfuel: string = '';
  planned_altairport: string = '';
  planned_remarks: string = '';
  planned_route: string = '';
  planned_depairport_lat: number = 0;
  planned_depairport_lon: number = 0;
  planned_destairport_lat: number = 0;
  planned_destairport_lon: number = 0;
  atis_message: string = '';
  time_last_atis_received: moment.Moment = moment.utc([2000, 0, 1]);
  time_logon: moment.Moment = moment.utc([2000, 0, 1]);
  heading: number = 0;
  QNH_iHg: number = 0.0;
  QNH_Mb: number = 0.0;
  //additional fields
  last_update_from_stream: moment.Moment = moment.utc([2000, 0, 1]);

  constructor(fields: string[], streamDate: moment.Moment) {
    if(fields.length == fieldNames.length) {
      var data = {};
      for(var i = 0; i < fieldNames.length; i++) {
        if(this.hasOwnProperty(fieldNames[i])) {
          //Parse dates
          if(this[fieldNames[i]] instanceof moment) {
            let tmp = moment(fields[i]);
            if(tmp.isValid()) {
              this[fieldNames[i]] = tmp;
            }
          }

          //Parse numbers
          if(typeof this[fieldNames[i]] === 'number') {
            let tmp: number = parseFloat(fields[i]);
            if(!isNaN(tmp)) {
              this[fieldNames[i]] = tmp;
            }
          }

          //Parse strings
          if(typeof this[fieldNames[i]] === 'string') {
            if(fields[i] != null) {
              this[fieldNames[i]] = fields[i];
            }
          } 


        }
        data[fieldNames[i]] = fields[i];
      }
    } else {
      throw 'Invalid number of fields';
    }

    this.last_update_from_stream = streamDate;
  }
}