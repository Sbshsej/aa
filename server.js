const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3002; 
const mongoUri = 'mongodb://127.0.0.1:27017'; 
const dbName = 'static-profile-page'; 

app.use(cors()); 
app.use(express.json()); 

app.post('/submit', async (req, res) => {
  const { email, inquiry, message } = req.body;

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('messages');

    await collection.insertOne({ email, inquiry, message, date: new Date() });
    console.log("mesage saved successfully",{email,inquiry,message});

    client.close();

    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error inserting message:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
