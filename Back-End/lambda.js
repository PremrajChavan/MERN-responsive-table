const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// npm install aws-serverless-express aws-lambda express cors body-parser mongoose


const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db Connected');
}

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String
});

const User = mongoose.model('User', UsersSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/demo', async (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.number = req.body.number;
  user.message = req.body.message;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

app.get('/demo', async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});


const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
