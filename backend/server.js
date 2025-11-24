require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())


function formatDateYYYYMMDD(d) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

app.get('/getPOTD', async (req, res) => {
  try {
    let { date } = req.query

    if (!date) {
      const d = new Date()
      d.setDate(d.getDate() - 1) 
      date = formatDateYYYYMMDD(d)
    }

    const result = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_KEY,
        date
      },
      timeout: 10000
    })

    res.json({
      date: result.data.date,
      title: result.data.title,
      explanation: result.data.explanation,
      url: result.data.url,
      media_type: result.data.media_type,
      copyright: result.data.copyright || null
    })
  } catch (error) {
    console.error('Erro /getPOTD:', error?.response?.data || error.message || error)
    res.status(500).json({ error: "Erro ao buscar foto do dia" })
  }
})

app.get('/getImagesByYear', async (req, res) => {
  try {
    const { query, startYear, endYear } = req.query

    if (!startYear || !endYear) {
      return res.status(400).json({ error: "Informe startYear e endYear" })
    }

    const result = await axios.get('https://images-api.nasa.gov/search', {
      params: {
        q: query || "",
        media_type: "image",
        year_start: startYear,
        year_end: endYear
      },
      timeout: 20000
    })

    const items = result.data.collection.items || []

    const limited = items.slice(0, 10)

    const images = limited.map(item => {
      const data = item.data[0]
      const link = item.links ? item.links[0].href : null

      return {
        nasa_id: data.nasa_id,
        title: data.title,
        description: data.description,
        date_created: data.date_created,
        url: link
      }
    })

    res.json(images)

    console.log(result)
  } catch (error) {
    console.error('Erro /getImagesByYear:', error?.response?.data || error.message || error)
    res.status(500).json({ error: "Erro ao buscar imagens" })
  }
})



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
