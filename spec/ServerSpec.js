'use strict';

const OpenWeatherMap = require('../owm');

describe('Server', () => {
    let owm;

    const c1 = {
        id: 3133880,
        name: 'Trondheim',
        state: 'Trøndelag',
        zip: 7013,
        country: 'no',
        lat: 63.4305,
        lng: 10.3951
    };

    const c2 = {
        id: 3136944,
        name: 'Steinkjer',
        state: 'Trøndelag',
        zip: 7713,
        country: 'no',
        lat: 64.0150,
        lng: 11.4953
    };

    beforeEach(() => {
        owm = new OpenWeatherMap('');
    });

    afterEach(() => {
        owm = null;
    });

    describe('Current weather', () => {
        beforeEach(() => {
            const dummyWeather = {
                id: 1234,
                main: {
                    temp: 15,
                    temp_min: 13,
                    temp_max: 17,
                    humidity: 1337,
                    pressure: 1338
                },
                weather: {
                    id: 200
                },
                wind: {
                    speed: 3,
                    deg: 123
                },
                clouds: {
                    all: 20
                },
                rain: {
                    '1h': 2
                },
                snow: {
                    '1h': 2
                }
            };

            owm.fetch = () => Promise.resolve(dummyWeather);
        });

        it('fetches by city name', async () => {
            const response = await owm.weatherByCityName(c1.name, c1.state, c1.country);

            // TODO: Verify content.
        });

        it('fetches by city ID', async () => {
            const response = await owm.weatherByCityId(c1.id);

            // TODO: Verify content.
        });

        it('fetches by coordinates', async () => {
            const response = await owm.weatherByCoordinates(c1.lat, c1.lng);

            // TODO: Verify content.
        });

        it('fetches by zip code', async () => {
            const response = await owm.weatherByZipCode(c1.zip, c1.country);

            // TODO: Verify content.
        });

        it('fetches in rectangle', async () => {
            const response = await owm.weatherInRectangle(c1.lat, c1.lng, c2.lat, c2.lng);

            // TODO: Verify content.
        });

        it('fetches in circle', async () => {
            const response = await owm.weatherInCircle(c1.lat, c1.lng);

            // TODO: Verify content.
        });

        it('fetches for multiple IDs', async () => {
            const response = await owm.weatherForMultipleIds([ c1.id, c2.id ]);

            // TODO: Verify content.
        });
    });

    describe('Forecasts', () => {
        beforeEach(() => {
            const dummyWeather = {
                id: 1234,
                main: {
                    temp: 15,
                    temp_min: 13,
                    temp_max: 17,
                    humidity: 1337,
                    pressure: 1338
                },
                weather: {
                    id: 200
                },
                wind: {
                    speed: 3,
                    deg: 123
                },
                clouds: {
                    all: 20
                },
                rain: {
                    '1h': 2
                },
                snow: {
                    '1h': 2
                }
            };

            owm.fetch = () => Promise.resolve({
                list: [
                    Object.assign({ ...dummyWeather }, { dt: 123456780 }),
                    Object.assign({ ...dummyWeather }, { dt: 123456781 }),
                    Object.assign({ ...dummyWeather }, { dt: 123456782 }),
                    Object.assign({ ...dummyWeather }, { dt: 123456783 }),
                    Object.assign({ ...dummyWeather }, { dt: 123456784 })
                ]
            });
        });

        describe('Hourly', () => {
            it('fetches by city name', async () => {
                const response = owm.hourlyByCityName(c1.name, c1.state, c1.country);

                // TODO: Verify content.
            });

            it('fetches by city ID', async () => {
                const response = owm.hourlyByCityId(c1.id);

                // TODO: Verify content.
            });

            it('fetches by zip code', async () => {
                const response = owm.hourlyByZipCode(c1.zip, c1.country);

                // TODO: Verify content.
            });
        });

        describe('Daily', () => {
            it('fetches by city name', async () => {
                const response = owm.dailyByCityName(c1.name, c1.state, c1.country);

                // TODO: Verify content.
            });

            it('fetches by city ID', async () => {
                const response = owm.dailyByCityId(c1.id);

                // TODO: Verify content.
            });

            it('fetches by coordinates', async () => {
                const response = owm.dailyByCoordinates(c1.lat, c1.lng);

                // TODO: Verify content.
            });

            it('fetches by zip code', async () => {
                const response = owm.dailyByZipCode(c1.zip, c1.country);

                // TODO: Verify content.
            });
        });

        describe('Monthly', () => {
            it('fetches by city name', async () => {
                const response = owm.monthlyByCityName(c1.name, c1.country);

                // TODO: Verify content.
            });

            it('fetches by city ID', async () => {
                const response = owm.monthlyByCityId(c1.id);

                // TODO: Verify content.
            });

            it('fetches by coordinates', async () => {
                const response = owm.monthlyByCoordinates(c1.lat, c1.lng);

                // TODO: Verify content.
            });

            it('fetches by zip code', async () => {
                const response = owm.monthlyByZipCode(c1.zip, c1.country);

                // TODO: Verify content.
            });
        });
    });

    describe('Historical data', () => {
        beforeEach(() => {
            owm.fetch = () => Promise.resolve({
                // TODO: Dummy data.
            });
        });

        it('fetches by city name', async () => {
            const response = owm.historyByCityName(c1.name, c1.state, c1.country);

            // TODO: Verify content.
        });

        it('fetches by city ID', async () => {
            const response = owm.historyByCityId(c1.id);

            // TODO: Verify content.
        });

        it('fetches by coordinates', async () => {
            const response = owm.historyByCoordinates(c1.lat, c1.lng);

            // TODO: Verify content.
        });
    });
});
