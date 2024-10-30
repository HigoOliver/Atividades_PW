const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Array inicial de animes
let animes = [
  {
    id: 1,
    name: 'Naruto',
    genre: 'Ação',
    studio: 'Pierrot'
  }
];

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Rota para listar todos os animes
app.get('/animes', (req, res) => {
  res.json(animes);
});

// Rota para listar um anime por ID
app.get('/animes/:id', (req, res) => {
  const { id } = req.params;
  const anime = animes.find(a => a.id === parseInt(id));

  if (!anime) {
    return res.status(404).send('Anime não encontrado');
  }

  res.json(anime);
});

// Rota para criar um novo anime
app.post('/animes', (req, res) => {
  const { name, genre, studio } = req.body;
  
  const newAnime = {
    id: animes.length + 1, 
    name,
    genre,
    studio
  };

  animes.push(newAnime);
  res.status(201).json(newAnime);
});

// Rota para atualizar um anime por ID
app.put('/animes/:id', (req, res) => {
  const { id } = req.params;
  const { name, genre, studio } = req.body;
  const anime = animes.find(a => a.id === parseInt(id));

  if (!anime) {
    return res.status(404).send('Anime não encontrado');
  }

  anime.name = name;
  anime.genre = genre;
  anime.studio = studio;
  
  res.json(anime);
});

// Rota para deletar um anime por ID
app.delete('/animes/:id', (req, res) => {
  const { id } = req.params;
  const index = animes.findIndex(a => a.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send('Anime não encontrado');
  }

  animes.splice(index, 1);
  res.send('Anime deletado com sucesso');
});

module.exports = { app, animes };
