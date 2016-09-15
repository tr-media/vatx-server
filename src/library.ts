export class Library {
    private airports = {}
    constructor() {
        require('../data/airports.json').map(a => {
            this.airports[a.id.toLowerCase()] = a;
        });
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
}