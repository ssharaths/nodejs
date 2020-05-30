console.log('loaded client side script')



// fetch('http://localhost:3000/weather?address=philadelphia').then((response) => {
//     // fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {

//         console.log(data)

//     })

// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
messageOne.textContent = 'From javascript'

const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    console.log(location)

    //---------

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        // fetch('http://puzzle.mead.io/puzzle').then((response) => {
        response.json().then((data) => {
    
            messageOne.textContent = data.temperature
            messageTwo.textContent = data.feelsLike
    
        })
    
    })

    //---------
})
