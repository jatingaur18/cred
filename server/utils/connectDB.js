const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const uri = process.env.mongodburi;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true,
        tlsAllowInvalidCertificates: false
    });

    try {
        await client.connect();
        const db = client.db('CreditSeaData');
        console.log('----------Connected to MongoDB----------');
        return db;
    } catch (err) {
        console.error('xxxxxxxxxxxx Failed to connect to MongoDB xxxxxxxxxxxx', err);
        throw err;
    }
}

module.exports = { connectToDatabase };