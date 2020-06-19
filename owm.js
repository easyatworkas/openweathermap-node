'use strict';

const querystring = require('querystring');
const fetch = require('node-fetch');

class OpenWeatherMap {
    #appId;
    #units;
    #language;
    #cache;

    constructor(appId, units = 'metric', language = 'en') {
        this.#appId = appId;
        this.#units = units;
        this.#language = language;

        this.setCache(new DummyCache());
    }

    setCache(cache) {
        this.#cache = cache;
    }

    getCache() {
        return this.#cache;
    }

    async fetch(subdomain, resource, parameters = {}) {
        let query = querystring.stringify(Object.assign(parameters, {
            appid: this.#appId,
            units: this.#units,
            lang: this.#language
        }));

        let url = 'https://' + subdomain + '.openweathermap.org/data/2.5/' + resource + '?' + query;

        return this.getCache()
            .get(url, () => fetch(url).then(res => res.text()))
            .then(json => JSON.parse(json))
    }

    async api(resource, parameters = {}) {
        return this.fetch('api', resource, parameters);
    }

    async pro(resource, parameters = {}) {
        return this.fetch('pro', resource, parameters);
    }

    async history(resource, parameters = {}) {
        return this.fetch('history', resource, parameters);
    }

    // CURRENT

    async weatherByCityName(cityName, state = null, countryCode = null) {
        return this.api('weather', {
            q: [ cityName, state, countryCode ].filter(v => v !== null).join(',')
        });
    }

    async weatherByCityId(id) {
        return this.api('weather', {
            id
        });
    }

    async weatherByCoordinates(lat, lon) {
        return this.api('weather', {
            lat,
            lon
        });
    }

    async weatherByZipCode(zipCode, countryCode = null) {
        return this.api('weather', {
            zip: [ zipCode, countryCode ].filter(v => v !== null).join(',')
        });
    }

    async weatherInRectangle(latBottom, lonLeft, latTop, lonRight, zoom) {
        return this.api('box/city', {
            bbox: [ lonLeft, latBottom, lonRight, latTop, zoom ].join(',')
        });
    }

    async weatherInCircle(lat, lon, cnt = 10) {
        return this.api('find', {
            lat,
            lon,
            cnt
        });
    }

    async weatherForMultipleIds(ids) {
        return this.api('group', {
            id: ids.join(',')
        });
    }

    // HOURLY

    async hourlyByCityName(cityName, state = null, countryCode = null) {
        return this.pro('forecast/hourly', {
            q: [ cityName, state, countryCode ].filter(v => v !== null).join(',')
        });
    }

    async hourlyByCityId(id) {
        return this.pro('forecast/hourly', {
            id
        });
    }

    async hourlyByCoordinates(lat, lon) {
        return this.pro('forecast/hourly', {
            lat,
            lon
        });
    }

    async hourlyByZipCode(zipCode, countryCode = null) {
        return this.pro('forecast/hourly', {
            zip: [ zipCode, countryCode ].filter(v => v !== null).join(',')
        });
    }

    // DAILY

    async dailyByCityName(cityName, state = null, countryCode = null, cnt = 7) {
        return this.api('forecast/daily', {
            q: [ cityName, state, countryCode ].filter(v => v !== null).join(','),
            cnt
        });
    }

    async dailyByCityId(id, cnt = 7) {
        return this.api('forecast/daily', {
            id,
            cnt
        });
    }

    async dailyByCoordinates(lat, lon, cnt = 7) {
        return this.api('forecast/daily', {
            lat,
            lon,
            cnt
        });
    }

    async dailyByZipCode(zipCode, countryCode = null) {
        return this.api('forecast/daily', {
            zip: [ zipCode, countryCode ].filter(v => v !== null).join(',')
        });
    }

    // MONTHLY

    async monthlyByCityName(cityName, countryCode = null) {
        return this.pro('climate/month', {
            q: [ cityName, countryCode ].filter(v => v !== null).join(',')
        });
    }

    async monthlyByCityId(id) {
        return this.pro('climate/month', {
            id
        });
    }

    async monthlyByCoordinates(lat, lon) {
        return this.pro('climate/month', {
            lat,
            lon
        });
    }

    async monthlyByZipCode(zipCode, countryCode = null) {
        return this.pro('climate/month', {
            zip: [ zipCode, countryCode ].filter(v => v !== null).join(',')
        });
    }

    // HISTORICAL

    async historyByCityName(cityName, state, countryCode, start, end, cnt) {
        return this.history('history/city', {
            q: [ cityName, state, countryCode ].filter(v => v !== null).join(','),
            type: 'hour',
            start,
            end,
            cnt
        });
    }

    async historyByCityId(id, start, end, cnt) {
        return this.history('history/city', {
            id,
            type: 'hour',
            start,
            end,
            cnt
        });
    }

    async historyByCoordinates(lat, lon, start, end, cnt) {
        return this.history('history/city', {
            lat,
            lon,
            type: 'hour',
            start,
            end,
            cnt
        });
    }
}

class DummyCache {
    async get(key, provider) {
        return provider();
    }
}

module.exports = OpenWeatherMap;
