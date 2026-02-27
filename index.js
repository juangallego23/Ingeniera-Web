import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.get('/api/personajes', async (req, res) => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();

    res.status(200).json({
      estado: "ok",
      total_personajes: data.info.count,
      primeros_5: data.results.slice(0, 5)
    });

  } catch (error) {
    res.status(500).json({
      estado: "error",
      mensaje: "No fue posible obtener los datos",
      detalle: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

app.get('/api/personajes/html', async (req, res) => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const personajes = data.results.slice(0, 5);

    let html = `<!doctype html><html><head><meta charset="utf-8"><title>Personajes</title></head><body><h1>Personajes (primeros 5)</h1><ul style="list-style:none;padding:0;display:flex;flex-wrap:wrap;">`;

    personajes.forEach(p => {
      html += `<li style="margin:10px;text-align:center;"><img src="${p.image}" alt="${p.name}" style="width:150px;height:auto;display:block;border-radius:8px;"/><strong>${p.name}</strong></li>`;
    });

    html += '</ul></body></html>';

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);

  } catch (error) {
    res.status(500).send('<p>Error al obtener personajes</p>');
  }
});