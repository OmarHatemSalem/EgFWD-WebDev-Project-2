//Gets today's date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//API Key for OpenWeatherAPI
const apiKey = '5a81fa346439f9f691dd60ee02cbfd38';

document.getElementById('generate').addEventListener('click', performAction);

//Gets Weather from API
const getWeather = async (code, key)=>{

  let finalURL = `https://api.openweathermap.org/data/2.5/weather?zip=${code},us&appid=${key}`;
  const res = await fetch(finalURL)
  try {
    
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

//Adds the event listener to the generate button
function performAction(e){
  const newCode =  document.getElementById('zip').value;
  const newCodeElem =  document.getElementById('zip');
  newCodeElem.value = "";

  const newFeel = document.getElementById('feelings').value;
  const newFeelElem =  document.getElementById('feelings');
  newFeelElem.value = "";
  getWeather(newCode, apiKey).then(function (data) {
    
    postData('/records', {temp:data.main.temp, date:newDate, feeling:newFeel});
    
  }).then(updateUI());
  
}

//Creates a POST request to send to the server
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// Dynamically chnages the UI Elements of the entry
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feeling;

  }catch(error){
    console.log("error", error);
  }
}