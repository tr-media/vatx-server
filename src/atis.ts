import * as moment from 'moment';
import { Client } from './client';

export class Atis extends Client {
    constructor(data: string[], streamDate: moment.Moment) {
        super(data, streamDate);
    }

    public toJson() {
        return {
           callsign: this.callsign,
           cid: this.cid,
           realname: this.realname,
           frequency: this.frequency,
           latitude: this.latitude,
           longitude: this.longitude,
           altitude: this.altitude,
           server: this.server,
           protrevision: this.protrevision,
           rating: this.rating,
           facilitytype: this.facilitytype,
           visualrange: this.visualrange,
           atis_message: this.atis_message,
           time_last_atis_received: this.time_last_atis_received,
           time_logon: this.time_logon,
           last_update_from_stream: this.last_update_from_stream
        }
    }
}