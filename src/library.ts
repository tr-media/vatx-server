export class Library {
    private airports = {}
    private airlines = {}
    constructor() {
        require('../data/airports.json').map(a => {
            this.airports[a.id.toLowerCase()] = a;
        });
        require('../data/airlines.json').map(a => {
            this.airlines[a.id.toLowerCase()] = a;
        });
        require('../data/airlines_va.json').map(a => {
            this.airlines[a.id.toLowerCase()] = a;
        });
        console.log('Library loaded');
    }

    public getAirports(mode: string = '') {
        return this.prepareData(this.airports, mode);
    }

    public getAirport(id: string) {
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    }

    public getAirlines(mode: string = '') {
        return this.prepareData(this.airlines, mode);
    }
    

    public getAirline(id: string) {
        if (this.airlines.hasOwnProperty(id)) {
            return this.airlines[id];
        }
        return null;
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