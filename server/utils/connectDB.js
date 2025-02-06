require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.mongodburi;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: false
});

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('CreditSeaData');
    console.log('----------Connected to MongoDB----------');
  } catch (err) {
    console.error('xxxxxxxxxxxx Failed to connect to MongoDB xxxxxxxxxxxx', err);
  }
}

module.exports = {
  connectToDatabase: connectToDatabase,
}