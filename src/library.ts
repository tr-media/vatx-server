export class Library {
    private airports = {}
    private airportSearchIndex = [];
    private airlines = {}
    private airlineSearchIndex = [];
    constructor() {
        require('../data/airports.json').map(a => {
            var key = a.id.toUpperCase();
            this.airports[key] = a;
            if(key.match(/[A-Za-z]{4}/)) {
                this.airports[key].major = true;
            }
        });
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: key, value: key });
        }
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: this.airports[key].name.toUpperCase(), value: key });
        }
        for (var key in this.airports) {
            this.airportSearchIndex.push({ key: this.airports[key].city.toUpperCase(), value: key });
        }
        require('../data/airlines.json').map(a => {
            this.airlines[a.id.toUpperCase()] = a;
        });
        require('../data/airlines_va.json').map(a => {
            this.airlines[a.id.toUpperCase()] = a;
        });
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: key, value: key });
        }
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: this.airlines[key].name.toUpperCase(), value: key });
        }
        for (var key in this.airlines) {
            this.airlineSearchIndex.push({ key: this.airlines[key].callsign.toUpperCase(), value: key });
        }
        console.log('Library loaded');
    }

    public getAirports(mode: string = '', all: boolean = false) {
        if (all) {
            return this.prepareData(this.airports, mode);
        } else {
            var tmp = {};
            for(var key in this.airports) {
                if(this.airports[key].major) {
                    tmp[key] = this.airports[key];
                }
            }
            return this.prepareData(tmp, mode);
        }
    }

    public getAirport(id: string) {
        id = id.toUpperCase();
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    }

    public getAirlines(mode: string = '') {
        return this.prepareData(this.airlines, mode);
    }


    public getAirline(id: string) {
        id = id.toUpperCase();
        if (this.airlines.hasOwnProperty(id)) {
            return this.airlines[id];
        }
        return null;
    }

    public find(q: string) {
        q = q.toUpperCase();
        return {
            airports: this.airportSearchIndex.filter(a => {
                return a.key.indexOf(q) === 0;
            }).map(a => {
                return a.value;
            }).slice(0, 20),
            airlines: this.airlineSearchIndex.filter(a => {
                return a.key.indexOf(q) === 0;
            }).map(a => {
                return a.value;
            }).slice(0, 20)
        }
    }

    private prepareData(dict: any, mode: string) {
        if (mode === 'list') {
            var result = [];
            for (var key in dict) {
                result.push(dict[key]);
            }
            return result;
        } else {
            return dict;
        }
    }

    public greatCircleDistance(loc1_lat: number, loc1_lon: number, loc2_lat: number, loc2_lon: number, precision: number = 4, unit: string = "nm"): number {
        var lat1: number = loc1_lat * Math.PI / 180;
        var lat2: number = loc2_lat * Math.PI / 180;
        var lon1: number = loc1_lon * Math.PI / 180;
        var lon2: number = loc2_lon * Math.PI / 180;

        var theta: number = lon1 - lon2;

        var rawdistance: number = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(theta);
        if (unit == "km") {
            var distance: number = Math.round(6371.000785 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "m") {
            var distance: number = Math.round(6371000.785 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "nm") {
            var distance = Math.round(3440.04664 * Math.acos(rawdistance));
            return distance;
        }
        if (unit == "ft") {
            var distance: number = Math.round(20902233.54659 * Math.acos(rawdistance));
            return distance;
        }
        return 0;
    }
}