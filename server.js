const express = require('express');
const cors = require("cors");
const fs = require('fs');

let app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

let counter = 0;

app.get('/traincar', (request, response)=>{
  console.log(counter);
  // This is a simulation example
  let carSimulation = JSON.parse(fs.readFileSync('./public/car.geojson', 'utf8')).features;
  let length = carSimulation.length;
  // The system should send the car data as a list [ {}, {}, {}, ... ]
  if (counter == length -1) counter = 0;
  let car1 = carSimulation[counter], car2 = carSimulation[(length - 1) - counter];
  car1.properties.Name = 'Punto 1';
  car2.properties.Name = 'Punto 2';
  let carList = [car1, car2 ];
  counter++;
  response.json(carList);
});

app.get('/', (request, response) =>{
  response.sendFile('./public/metro.html', {root: __dirname });
});

app.listen(process.env.PORT || 8080, ()=>{
  console.log('Express app initialized');
});
