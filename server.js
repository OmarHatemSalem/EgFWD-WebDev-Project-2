// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

//Function to listen to the server
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

const server = app.listen(port, listening);

const data = [];

//GET Request to save data
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
  })

//POST Request to store data in the correct format
app.post('/records', function (req, res) {
    let newData = req.body;
      
    projectData.temp = newData.temp;
    projectData.date = newData.date;
    projectData.feeling = newData.feeling;
  
    
    data.push(projectData);
    //console.log(projectData);
  })
  