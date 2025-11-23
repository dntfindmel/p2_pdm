require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.get('/getPOTD', async (req, res) => {
    try {
        const result = await axios.get(
            'https://api.nasa.gov/planetary/apod',
            { params: { api_key: process.env.NASA_KEY } }
        );

        res.json({
            imageDate: result.data.date,
            imageUri: result.data.url,
            imageTitle: result.data.title
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar foto do dia" })
    }
});

app.get('/searchPhotos', async (req, res) => {
    const { q, year } = req.query;

    try {
        const result = await axios.get(
            'https://images-api.nasa.gov/search',
            { params: { q } }
        );

        const photos = result.data.collection.items.filter(item => {
            if (!item.data || !item.data[0].date_created) return false;

            const photoYear = new Date(item.data[0].date_created).getFullYear();
            return photoYear == year;
        });

        const formatted = photos.slice(0, 10).map(p => ({
            imageDate: p.data[0].date_created,
            imageUrl: p.links?.[0]?.href,
            imageTitle: p.data[0].title,
            imageDescription: p.data[0].description
        }));

        res.json(formatted);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar imagens" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
