const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Definición de rutas de configuración
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Llamado cargado mediante hbs
// Configuración de handlebars y ubicación de la carpeta
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Configuración para cargado de directorio estático (carpeta public)
app.use(express.static(publicDirectory));

// Llamado cargado mediante hbs
app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Daniel'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You should send to address parameter!'
        });
    }

    geocode(address, (error, { long, lat, namePlace } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecastData,
                namePlace,
                address
                /*forecast: 'It`s rainy',
                location: 'Medellín',
                address*/
            });
        })

    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel'
    });

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: '404',
        message: 'This page is for information',
        title: 'Help!',
        name: 'Daniel'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Daniel'
    })
});

// Pagina 404
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Oops! Page not found!',
        name: 'Daniel'
    })
})

// llamado enviando HTML directamente
/* app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>');
}); */


/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Daniel'
    }, {
        name: 'Pablo'
    }]);
});

app.get('/about', (req, res) => {
    res.send('About');
}); */


app.listen(3000, () => {
    console.log('Server is up in port 3000');
})