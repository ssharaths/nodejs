const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather = require('./app.js')


const app = express()

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const viewsPath = path.join(__dirname,'../templates/views')

const partialPath = path.join(__dirname, '../templates/partials')
app.set('views',viewsPath)

// app.get('', (req,res) => {

//     //res.send('Hello Express')
//     res.send(' <h1> Weather </h1>')

// })

app.set('view engine', 'hbs')

hbs.registerPartials(partialPath)


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App HBS',
        city: 'San Francisco'
    })
})

app.get('/about', (req,res) => {
   res.render('about',{
       title: 'Weather app about HBS',
       city: 'San Jose'
   })

})

app.get('/help', (req,res) => {

    res.render('help', {

        message: ' Weather App message',
        title: 'help page HBS',
        city: 'San Francisco'
    })
})

app.use(express.static(path.join(__dirname, '../public')))
app.get('/help', (req,res) => {

    res.send([{name: 'NAME', city: 'CITY', age:32}])
})


app.get('/about', (req,res) => {

    res.send('<h1> About Page </h1>')
})

app.get('/weather', (req,res) => {
   
    // if ( req.query.address) {

    //     return res.send( [{address:req.query.address, temperature:50, feelsLike: 52}])
    // } else {
    //     res.send( [{error: ' provide address',  } ])
    // }

    
//-----

    console.log(req.query)
    console.log(req.headers)

    if ( !req.query.address) {
        return (res.send([{error: ' provide address' } ]))
    } 
    else {
    
        weather.geocode(req.query.address, (error,{latitude,longitude} = {}) => {
    
             console.log('data +++ ', latitude, longitude)
               weather.forecast({latitude,longitude}, (error,forecastData) => {
              
                console.log('DATA +++ ' , forecastData)
                return res.send(forecastData)
                 
              })
    
        })
   }

//-----



    // res.send({
    //     temperature:50,
    //     feelsLike: 52,
    //     location:'Philadelphia'

    // })

})

app.get('/help/*', (req,res) => {

    res.render('404', {
        title:'404',
        city: 'CITY',
        errorMessage: ' 404 help Page not found'
    })
}

)

app.get('*', (req,res) => {

   res.render('404', {
       title:'404',
       city: 'CITY',
       errorMessage: ' 404 Page not found'
   })
})

app.listen(3000, () => {
    console.log(' Server started on port 3000')
})

