const express = require('express');
const fs = require('fs');

let app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());

let counter = 0;

app.get('/traincar', (request, response)=>{
  // This is a simulation example
  let carSimulation = JSON.parse(fs.readFileSync('./public/car.geojson', 'utf8')).features;
  let length = carSimulation.length;
  // The system should send the car data as a list [ {}, {}, {}, ... ]
  let car1 = carSimulation[counter], car2 = carSimulation[(length - 1) - counter];
  car1.properties.Name = 'Punto 1';
  car2.properties.Name = 'Punto 2';
  let carList = [car1, car2 ];
  counter++;
  response.json(carList);
});

app.listen(8080, ()=>{
  console.log('Express app on port:' + 8080);
});
