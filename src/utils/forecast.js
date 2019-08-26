const request = require ('request')
const chalk = require ('chalk')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d32d0e5ccf43757a795b47d1830b416a/'+ longitude + ',' + latitude + '?units=si'

        request({url, json: true}, (error, { body }) => {
            if (error) {
                callback('Unable to retrieve results.', undefined)
            } else if (body.error) {
                callback('Unable to find location.', undefined)
            } else {
                callback(undefined, 'It is currently ' + body.currently['temperature'] + ' degrees outside. There is ' + body.currently['precipProbability'] + '% chance of rain. There is an expected high of ' + body.daily.data[0].temperatureHigh + ' degrees today, and an expected low of ' + body.daily.data[0].temperatureLow + ' degrees.')
            }
        })
    }

module.exports = forecast