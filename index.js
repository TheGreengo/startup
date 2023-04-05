const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Here is where the individual routes will go
// apiRouter.get('/scores', async (_req, res) => {
//  const scores = await DB.getHighScores();
//  res.send(scores);
// });
  
// apiRouter.post('/score', async (req, res) => {
//     DB.addScore(req.body);
//     const scores = await DB.getHighScores();
//     res.send(scores);
//   });

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});