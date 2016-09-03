import { VatsimDatabase } from './vatsim-database';
import { Server } from './server';
import { Client } from './client';
import { Pilot } from './pilot';
import { Atc } from './atc';
import { Atis } from './atis';
import * as request from 'request';
import * as moment from 'moment';

export class VatsimDownloader {
  private nextServerUpdate: moment.Moment = moment();
  private nextClientUpdate: moment.Moment = moment();
  private serverList: Server[] = [];
  public lastStreamDate: moment.Moment = moment.utc([2000, 0, 1]);

  public update(next: Function) {
    this.getServers(function () {
      this.getClients(function (error, clients: Client[]) {
        if (!error) {
          console.log(clients.length + ' clients.');
          next(clients);
        } else {
          next();
        }
      }.bind(this));
    }.bind(this));
  }

  private getClients(next: Function) {
    if (this.nextClientUpdate.isSameOrBefore(moment())) {
      var shuffledServerList = this.shuffleServerList();
      console.log('Client update from ' + shuffledServerList[0].url);
      //TODO: If one server is not responding, try the next one in shuffled list.
      this.getTextfile(shuffledServerList[0].url, function (error, lines: string[]) {
        if (!error) {
          var dataIsNewer = false;
          let clients: Client[] = [];
          let clientZone: boolean = false;
          for (var i in lines) {
            if (lines[i].indexOf('UPDATE = ') === 0) {
              let date: string = lines[i].substr(9).trim();
              var streamDate = moment.utc(date, "YYYYMMDDHHmmss");
              if(streamDate.isAfter(this.lastStreamDate)) {
                this.lastStreamDate = streamDate;
              } else {
                break;
              }
            }
            if (lines[i].indexOf('!SERVERS:') === 0 || lines[i].indexOf('!PREFILE:') === 0) clientZone = false;
            if (lines[i].indexOf(';') !== 0 && clientZone) {
              try {
                var client = this.getClient(lines[i], this.lastStreamDate);
                clients.push(client);
              } catch (err) {
                console.log(err);
              }
            }
            if (lines[i].indexOf('!CLIENTS:') === 0) {
              clientZone = true;
            }
          }
          this.nextClientUpdate = moment().add(1, 'minute');
          next(null, clients);
        } else {
          this.nextClientUpdate = moment().add(1, 'minute');
          console.log('Failed to get client list. Will retry in 1 minute.')
          next(true);
        }
      }.bind(this));
    } else {
      next(true);
    }

  }

  private getServers(next: Function) {
    if (this.nextServerUpdate.isSameOrBefore(moment())) {
      this.getTextfile('http://status.vatsim.net/', function (error, servers: string[]) {
        if (!error) {
          this.serverList = servers.filter(s => { return s.indexOf('url0=') === 0 }).map(s => { return new Server(s.substr(5)); });
          console.log('Server list downloaded successfully: ' + this.serverList.length + ' data servers available.');
          this.nextServerUpdate = moment().add(1, 'day');
        } else {
          console.log('Failed to get server list. Will retry in 5 minutes.')
          this.nextServerUpdate = moment().add(5, 'minutes');
        }
        next();
      }.bind(this));
    } else {
      next();
    }

  }

  private getTextfile(url, callback: Function) {
    request.get({ url: url, timeout: 10000 }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(null, body.replace(/\r/g, '').split('\n'));
      } else {
        callback(error);
      }
    })
  }

  private shuffleServerList(): Server[] {
    let temporaryServerList = [];
    let indices = this.serverList.map((e, i) => {
      return i;
    });
    while (indices.length > 0) {
      let k = Math.floor(Math.random() * indices.length);
      temporaryServerList.push(indices.splice(k, 1));
    }
    return temporaryServerList.map(i => {
      return this.serverList[i];
    });
  }

  private getClient(input: string, streamDate: moment.Moment): Client {
    var fields = input.split(':');
      if (fields[3] === 'PILOT') {
        return new Pilot(fields, streamDate);
      } else if (fields[3] === 'ATC' && fields[0].indexOf('_ATIS') === fields[0].length - 5) {
        return new Atis(fields, streamDate);
      } else if (fields[3] === 'ATC') {
        return new Atc(fields, streamDate);
      } else {
        throw 'Invalid data';
      }
  }
}