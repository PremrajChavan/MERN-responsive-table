const express = require('express');
const server = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log("db Connected");
}

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String
});

const User = mongoose.model('User', UsersSchema);

server.use(cors())
server.use(bodyParser.json())


server.post('/demo', async (req, res) => {
  try {
    let user = new User(req.body);
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.get('/demo', async (req, res) => {
  try {
    const docs = await User.find({});
    res.json(docs);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


server.delete('/demo/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(8080, () => {
  console.log("server started");
});
