const request = require ('request')
const chalk = require ('chalk')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFtZW5hdG9yIiwiYSI6ImNqejRoeXNmMDBlamEzaG1qbnRzeDc4YzYifQ.FVR88WPFpIpXLQ3Vc6OoYQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            // console.log('There was an issue.')
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location ' + chalk.red.inverse(address), undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode