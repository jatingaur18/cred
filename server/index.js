require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./utils/connectDB');
const uploads = require('./api/upload');
const fetchlist = require('./api/fetchlist');
const fetchProfiles = require('./api/fetchProfiles');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;
async function initializeApp() {
    db = await connectToDatabase();
    
    app.use('/upload', uploads(db));
    app.use('/fetchlist', fetchlist(db));
    app.use('/fetchprofile', fetchProfiles(db));
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

initializeApp().catch(console.error);
