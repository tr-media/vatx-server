export class Library {
    private airports = {}
    constructor() {
        require('../data/airports.json').map(a => {
            this.airports[a.id.toLowerCase()] = a;
        });
    }

    public getAirports() {
        return this.airports;
    }

    public getAirport(id: string) {
        if (this.airports.hasOwnProperty(id)) {
            return this.airports[id];
        }
        return null;
    }
}