const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuaWVsdmoxNzgiLCJhIjoiY2tzcGl1angyMDM4ZTJycjQ4dnExc3FmZiJ9.FFQSJHFpyqaBBYkeAEoN4w&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            //console.log('Unable service');
            callback('Unable service', undefined);
        } else if (body.features.length === 0) {
            //console.log('There are error in API. Try again later');
            callback('There are error in API. Try again later', undefined);
        } else {
            const [long, lat] = body.features[0].center;
            const namePlace = body.features[0].place_name;
            callback(undefined, {
                long,
                lat,
                namePlace
            })
            //console.log(long, lat);
        }
    })
}

module.exports = geocode