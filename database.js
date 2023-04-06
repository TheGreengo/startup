const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const taskCollection = client.db('organized').collection('task');
const eventCollection = client.db('organized').collection('event');
const noteCollection = client.db('organized').collection('note');
const userCollection = client.db('organized').collection('user');

function getUser(uName) {
    return userCollection.findOne({ uName: uName });
}
  
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}
  
async function createUser(uName, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      uName: uName,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
}

// TODO: Here's where the functions to set and get stuff
//       will go
//
// function addScore(score) {
//   scoreCollection.insertOne(score);
// }

function addTask(task) {
  taskCollection.insertOne(task);
}

function addEvent(event) {
  const newEvent = {
    id: uuid.v4(),
    date: event.date, 
    title: event.title,
    user: event.user
  };
  eventCollection.insertOne(newEvent);
}

function addNote(note) {
  noteCollection.insertOne(note);
}
// function getHighScores() {
//   const query = {score: {$gt: 0}};
//   const options = {
//     sort: {score: -1},
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

function getEvents(userName) {
  const query = {user: 'fire'};
  console.log(`Username: ${userName}`);
  const cursor = eventCollection.find(query);
  return cursor.toArray();
}

module.exports = {
  addEvent,
  getEvents,
  getUser,
  getUserByToken,
  createUser
};