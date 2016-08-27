import { Client } from './client';
import { Pilot } from './pilot';
import { Atc } from './atc';
import { Atis } from './atis';
import { VatsimDownloader } from './vatsim-downloader';
import * as moment from 'moment';

export class VatsimDatabase {

  private downloader: VatsimDownloader = new VatsimDownloader();
  private startTime: moment.Moment = moment();
  private pilots: Pilot[] = [];
  private atcs: Atc[] = [];
  private atis: Atis[] = [];

  public lastServerUpdate: moment.Moment;

  constructor() {
    setTimeout(this.timer.bind(this), 500);
  }

  private timer() {
    this.downloader.update(function (clients: Client[]) {
      if (clients) {
        this.pilots = clients.filter(c => { return c instanceof Pilot });
        this.atcs = clients.filter(c => { return c instanceof Atc });
        this.atis = clients.filter(c => { return c instanceof Atis });
      }
      setTimeout(this.timer.bind(this), 5000);
    }.bind(this));
  }

  listClients() {
    return {
      pilots: this.pilots,
      atcs: this.atcs,
      atis: this.atis
    };
  }

  listPilots() {
    return this.pilots;
  }

  listAtcs() {
    return this.atcs;
  }

  listAtis() {
    return this.atis;
  }

  getStats() {
    return {
      OnlinePilots: this.pilots.length,
      OnlineAtcs: this.atcs.length,
      OnlineAtis: this.atis.length,
      OnlineClients: this.pilots.length + this.atcs.length + this.atis.length,
      LastStreamUpdate: this.downloader.lastStreamDate.utc().format(),
      ServerTime: moment().utc().format(),
      StreamAge: Math.round(moment().diff(this.downloader.lastStreamDate) * 0.001)
    };
  }

  getServerInfo() {
    return {
      version: require('../package.json').version,
      started: this.startTime.utc().format() 
    };
  }
}