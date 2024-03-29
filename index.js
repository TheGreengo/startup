const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerproxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.uName)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.uName, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });
  
  // GetAuth token for the provided credentials
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.uName);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
  apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // GetUser returns information about a user
  apiRouter.get('/user/:uName', async (req, res) => {
    const user = await DB.getUser(req.params.uName);
    if (user) {
      const token = req?.cookies.token;
      res.send({ uName: user.uName, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });

  apiRouter.delete('/deleteTask/:id', async (req, res) => {
    console.log("got called");
    const success = await DB.delTask(req.params.id);
    if (!success) {
      res.status(404).send({ msg: 'Problems' });
    } else {
      res.status(204).end();
    }
  });
  // Here is where the individual routes will go
// apiRouter.get('/scores', async (_req, res) => {
//  const scores = await DB.getHighScores();
//  res.send(scores);
// });
  
apiRouter.get('/events/:uName', async (req,res) => {
  const events = await DB.getEvents(req.params.uName);
  if (events) {
    res.send(events);
    console.log("Success");
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});
  
apiRouter.get('/notes/:uName', async (req,res) => {
  const notes = await DB.getNotes(req.params.uName);
  if (notes) {
    res.send(notes);
    console.log("Success");
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});
  
apiRouter.get('/tasks/:uName', async (req,res) => {
  const tasks = await DB.getTasks(req.params.uName);
  if (tasks) {
    res.send(tasks);
    console.log("Success");
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// apiRouter.post('/score', async (req, res) => {
//     DB.addScore(req.body);
//     const scores = await DB.getHighScores();
//     res.send(scores);
//   });
apiRouter.post('/event', async (req, res) => {
  DB.addEvent(req.body);
  const events = await DB.getEvents(req.body.user);
  res.send(events);
});

apiRouter.post('/note', async (req, res) => {
  DB.addNote(req.body);
  const notes = await DB.getNotes(req.body.user);
  res.send(notes);
});
  

apiRouter.post('/task', async (req, res) => {
  DB.addTask(req.body);
  const tasks = await DB.getTasks(req.body.user);
  res.send(tasks);
});
  
  // secureApiRouter verifies credentials for endpoints
  var secureApiRouter = express.Router();
  apiRouter.use(secureApiRouter);
  
  secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});
  
  // Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
  
  // setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}
  
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);