const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ramen Booko'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ramen Booko'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ramen Booko'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You need to provide an address or location for the weather search.'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        if (req.query.address){
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide some search terms.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'website'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})