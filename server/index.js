const express = require('express');
const cors = require('cors');
const port = 3000;

const loginRoute = require('./api/login');
const signupRoute = require('./api/register');
const uploads =  require('./api/upload')
const fetchlist =  require('./api/fetchlist')
const fetchProfiles =  require('./api/fetchProfiles')

const {connectToDatabase} = require('./utils/connectDB');

let db;
let bucket;

connectToDatabase();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/upload', uploads);
app.use('/fetchlist',fetchlist);
app.use('/fetchprofile', fetchProfiles);




app.listen(port, () => {
  console.log(`listening on port ${port}`)
})