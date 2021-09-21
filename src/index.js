import 'dotenv/config';
import express from 'express';
import {MongoClient} from "mongodb";
import bodyParser from "body-parser";

// https://www.robinwieruch.de/javascript-project-setup-tutorial/
// https://www.robinwieruch.de/node-js-express-tutorial

const VERSION = "0.0.1";

// Create an express app, set it to expect JSON input and create a Mongo DB
const app = express();
const jsonParser = bodyParser.json()
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`

// A bit of setup, check the DB is reachable and create a messages collectuion (table) if it does not exist
MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  console.log("Mongo is on " + client.s.url);
  const dbo = client.db(process.env.MONGO_NAME);
  dbo.createCollection("messages", function (err, res) {
    if (err) {
      console.log("messages collection already exists.");
    } else {
      console.log("messages collection created!");
    }
  });
});

// Register a root path.
app.get('/', (req, res) => {
  const body = {
    version: VERSION
  }
  res.send(JSON.stringify(body));
});

// Register a GET all messages end point
app.get('/messages', jsonParser, (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db("local");
    // load all the messages and send as a response
    db.collection('messages').find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

// Register a GET messages by user end point
app.get('/messages/:dest', jsonParser, (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db("local");
    const dest = req.params.dest;
    // TODO: sanity check that path param
    // load all the messages for that dest and send as a response
    db.collection('messages').find({ dest: dest }).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

// Register a PUT end point to receive new massages
app.put('/messages', jsonParser, (req, res) => {
  // Get the body content
  const payload = req.body;
  // TODO: sanity check the payload, is there a dest and msg key?
  // Connect to the doc store and save it
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db("local");
    db.collection('messages').insertOne(payload).then((payload) => {
      console.log('Message saved')
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      client.close();
    });
  });
  res.send();
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
