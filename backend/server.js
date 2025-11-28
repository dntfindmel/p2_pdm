require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

function formatarData(d) {
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

app.get("/getPOTD", async (req, res) => {
  try {
    let data = req.query.date;

    if (!data) {
      let hoje = new Date();
      hoje.setDate(hoje.getDate() - 1);
      data = formatarData(hoje);
    }

    let resposta = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: process.env.NASA_KEY,
        date: data
      }
    });

    res.json({
      date: resposta.data.date,
      title: resposta.data.title,
      explanation: resposta.data.explanation,
      url: resposta.data.url,
      media_type: resposta.data.media_type,
      copyright: resposta.data.copyright
    });

  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar APOD" });
  }
});

app.get("/getImagesByYear", async (req, res) => {
  try {
    const { query, startYear, endYear } = req.query;

    if (!startYear || !endYear) {
      return res.status(400).json({ error: "Informe startYear e endYear" });
    }

    const resposta = await axios.get("https://images-api.nasa.gov/search", {
      params: {
        q: query || "",
        media_type: "image",
        year_start: startYear,
        year_end: endYear
      }
    });

    let itens = resposta.data.collection.items;
    let primeiros = itens.slice(0, 10);

    let imagens = primeiros.map((item) => {
      let dados = item.data[0];
      let link = item.links ? item.links[0].href : null;

      return {
        nasa_id: dados.nasa_id,
        title: dados.title,
        description: dados.description,
        date_created: dados.date_created,
        url: link
      };
    });

    res.json(imagens);

  } catch (e) {
    res.status(500).json({ error: "Erro ao buscar imagens" });
  }
});

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log("Servidor rodando na porta " + porta);
});
