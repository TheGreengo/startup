const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Here is where the individual routes will go
// apiRouter.get('/scores', (_req, res) => {
//     res.send(scores);
// });
  
// apiRouter.post('/score', (req, res) => {
//     scores = updateScores(req.body, scores);
//     res.send(scores);
// });

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});