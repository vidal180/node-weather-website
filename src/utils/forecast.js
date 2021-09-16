const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b7cce8d0e037fd5e4414892401f3b073&query=${lat},${long}=&units=m`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            //console.log('Unable service');
            callback('Unable service', undefined);
        } else if (body.error) {
            //console.log('There are error in API. Try again later')
            callback('There are error in API. Try again later', undefined);
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current;

            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
            //console.log(`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
        }

    });
}

module.exports = forecast;