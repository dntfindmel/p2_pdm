require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

app.get('/getPOTD', async (req, res) => {
    const potdClient = axios.create({
        baseURL: 'https://api.nasa.gov/planetary/apod'
    })

    const result = await potdClient.get('', {
        params: {
            api_key: process.env.NASA_API_KEY
        }
    })

    res.json(result.data)
})

app.get('/searchPhotos', async (req,res) => {
    const imageLibClient = axios.create({
        baseURL: 'https://images-api.nasa.gov/search'
    })

    const result = await imageLibClient.get('', {
        params: {
            q: req.query.q 
        }
    })

    const photos = result.data.collection.items.filter((item) => {
        currentDate = new Date(item.data[0].date_created)
        photoYearDate = currentDate.getFullYear()

        return photoYearDate.toString() ===  req.query.year
    })

    const filteredPhotos = []
    let maxPhotos = 10

    maxPhotos = photos.length < maxPhotos ? photos.length : maxPhotos
    
    for(let i = 0; i < maxPhotos; i++) {
        formattedResponse = {
            imageDate: photos[i].data[0].date_created,
            imageUrl: photos[i].links[0].href,
            imageTitle: photos[i].data[0].title,
            imageDescription: photos[i].data[0].description
        }

        filteredPhotos.push(formattedResponse)
    }
    
    res.json(filteredPhotos)
})

const port = 3000
app.listen(port, () => console.log(`BackPorta ${port}`))