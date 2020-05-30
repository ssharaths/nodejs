const request = require("request")

// const request = require('request')

// //http://api.weatherstack.com/current?access_key=79341fc607bf2588281fc58463a0b561&query=37.8267,-122.4233

// const url = 'http://api.weatherstack.com/current?access_key=79341fc607bf2588281fc58463a0b561&query=37.8267,-122.4233&units=f'
// //const url = 'http://api.weatherstack.com/current?access_key=79341fc607bf2588281fc58463a0b561&query=&units=f'
// request({ url:url, json:true}, (error,response) => {

//     //console.log(response)
//    // const data = JSON.parse(response.body)
//      if(error){
//          console.log('weather service not available')
//      } else if(response.body.error){
//          console.group('unable to find location')
//      } else {

//     console.log(response.body.current.temperature)
//     console.log(' It is currently ' + response.body.current.temperature + ' degrees out.' + ' it feels like ' + response.body.current.feelslike)
// }})

// //pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Q
// ///geocoding/v5/{endpoint}/{search_text}.json
// //mapbox.places or mapbox.places-permanent
//  //const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=//pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Qhttps://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Q&limit=1https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Q&limit=1'
// const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Q&limit=1'
// request({url:url1, json:true}, (error,response) => {

    
//     console.log(response.body.features[0].center[1], response.body.features[0].center[0])
    
// })


//encodeURIComponent(address)
//const request = require('request')

const geocode = (address,callback) => {


    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3NoYXJhdGhzY2EiLCJhIjoiY2thbmE3a2M5MGcwNzJ5cm16dmJ2amc2aCJ9.6IPtmCxJx83uxJdI6O9x_Q&limit=1'

    request({url:url,json:true}, (error,response) => { 

        if (error) {
            callback('unable to connect to location services', undefined)
            console.log('error')
        } else if ( response.body.features.length === 0) {
            callback('unable to find location, try', undefined)
            console.log('error 2')
        } else {
            console.log(' got the location')
            callback(undefined,{latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0]
            })
        }
} )






    }

// geocode('philadelphi',(error, data) => {
//  console.log('Error ', error)
//  console.log('data ', data)
// })







//---------------

const forecast = ({latitude,longitude},callback) => {

    //console.log('lat +++ ', lat, 'long  +++', long)
    const url = 'http://api.weatherstack.com/current?access_key=79341fc607bf2588281fc58463a0b561&query='+ latitude + ',' + longitude + '&units=f'
    
    const url1='http://api.weatherstack.com/current?access_key=79341fc607bf2588281fc58463a0b561&query=40.0115,-75.1327&units=f'
    request({url:url, json:true}, (error,response) => {
        if(error){
            console.log('weather service not available')
            callback('weather service not available',undefined)
        } else if(response.body.error){
            console.group('unable to find location')
           callback('unable to find location',undefined)
        } else {
   
       console.log(response.body.current.temperature)
       console.log(' It is currently ' + response.body.current.temperature + ' degrees out.' + ' it feels like ' + response.body.current.feelslike)
        callback(undefined,{temperature:response.body.current.temperature, feelsLike: response.body.current.feelslike})
    }
     
    })

}

// forecast({lat:'40.0115',long:'-75.1327'}, (error,data) => {

//     console.log('DATA' , data)
// })

//comment



const address = process.argv[2]

if(!address) {
    console.log(' Enter a valid address')
} else {

    geocode(address, (error,{latitude,longitude} = {}) => {

        console.log('data +++ ', latitude, longitude)
          forecast({latitude,longitude}, (error,forecastData) => {
          
            console.log('DATA +++ ' , forecastData)
             
          })

    })
}

module.exports = {
    forecast : forecast,
    geocode : geocode


}