// Create a map object
var myMap = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 10.4
  });

var corner1 = L.latLng(45, -83),
corner2 = L.latLng(41, -75),
bounds = L.latLngBounds(corner1, corner2);

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Country data
var url_app = `/api/v2/covidTmp`;
var city_test  = [];
var months = [];
var myCircles = [];
var myLayer = new L.LayerGroup();

function month_names(mth){
  var month_name;
  
  switch (mth) {
    case 1:
      month_name = "January";
      break;
    case 2:
      month_name = "February";
      break;
    case 3:
      month_name = "March";
      break;
    case 4:
      month_name = "April";
      break;
    case 5:
      month_name = "May";
      break;
    case 6:
      month_name = "June";
      break;
    case 7:
      month_name = "July";
      break;
    case 8:
      month_name = "August";
      break;
    case 9:
      month_name = "September";
      break;
    case 10:
      month_name = "October";
      break;
    case 11:
      month_name = "November";
      break;
    case 12:
      month_name = "December";
  }                        

  return month_name;
}


function dropdown_month(){

  d3.json(url_app).then(function(data){
    
    for (var i = 0; i<data.length;i++){

        var datapoint = data[i];
        months.push(datapoint[1])
        //console.log("Month: ",datapoint)
    };

    //console.log("Month: ",months)
// We create an array with all the unique values of months
  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

  var unique = months.filter(onlyUnique);
  //console.log("Unique: ",unique)  
// We add array to drop-down menu
  var choice = d3.select("#selMonth");
  
  unique.forEach(function(data){
           choice.append("option").text(month_names(data)).property("value",data)
   })


  })};

dropdown_month();


function mapData(){

  d3.json(url_app).then(function(data){

    for (var i = 0; i<data.length;i++){

        var datapoint = data[i];
        city_test.push({name: datapoint[0], month: datapoint[1], location: [datapoint[2],datapoint[3]], cases: datapoint[4]})
 
    };

    // Loop through the cities array and create one marker for each city object
    myCircles = [];

    for (var i = 0; i < city_test.length; i++) {
      if(city_test[i].month == 3) {
      // Conditionals for countries points
      var color = "";
    
      if (city_test[i].cases > 10000) {
        color = "yellow";
      }
      else if (5000 <= city_test[i].cases <= 9999) {
        color = "blue";
      }
      else if (1000 <= city_test[i].cases <= 4999) {
        color = "green";
      }
      else if (500 <= city_test[i].cases <= 999) {
        color = "pink";
      }
      else if (100 <= city_test[i].cases <= 499) {
        color = "orange";
      }
      else {
        color = "red";
      }
    
      // Add circles to map
      myCircles.push(
        L.circle(city_test[i].location, {
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: city_test[i].cases * 15
      }).bindPopup("<h1>" + city_test[i].name + "</h1> <hr> <h3>Month: " + month_names(city_test[i].month) + "</h3> <hr> <h3>Cases: " + city_test[i].cases + "</h3>")
      );
      

    }};
    myLayer = L.layerGroup(myCircles);
    myLayer.addTo(myMap);

})};

mapData();

function updatedMapData(){

    d3.json(url_app).then(function(data){
  
      var dropdownMonth = d3.selectAll("#selMonth").node().value;

      for (var i = 0; i<data.length;i++){
  
          var datapoint = data[i];
          city_test.push({name: datapoint[0], month: datapoint[1], location: [datapoint[2],datapoint[3]], cases: datapoint[4]})
   
      };
      
      // Loop through the cities array and create one marker for each city object
      myCircles = [];

      for (var i = 0; i < city_test.length; i++) {
        if(city_test[i].month == `${dropdownMonth}`) {
        // Conditionals for countries points
        var color = "";
        
        if (city_test[i].cases > 10000) {
          color = "yellow";
        }
        else if (5000 <= city_test[i].cases <= 9999) {
          color = "blue";
        }
        else if (1000 <= city_test[i].cases <= 4999) {
          color = "green";
        }
        else if (500 <= city_test[i].cases <= 999) {
          color = "pink";
        }
        else if (100 <= city_test[i].cases <= 499) {
          color = "orange";
        }
        else {
          color = "red";
        }
        
        // Add circles to map
        
        myCircles.push(
          L.circle(city_test[i].location, {
          fillOpacity: 0.5,
          color: "white",
          fillColor: color,
          // Adjust radius
          radius: city_test[i].cases * 15
        }).bindPopup("<h1>" + city_test[i].name + "</h1> <hr> <h3>Month: " + month_names(city_test[i].month) + "</h3> <hr> <h3>Cases: " + city_test[i].cases + "</h3>")
        );

        
      }};
      //myCircles.clearLayers();
      myLayer.clearLayers();
      myLayer = L.layerGroup(myCircles);
      myLayer.addTo(myMap);

  })};

  d3.selectAll("#selMonth").on("change", updatedMapData);

