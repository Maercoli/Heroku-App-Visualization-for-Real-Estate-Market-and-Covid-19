// Create a map object
var myMap = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 5.4
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
  
function mapData(){

  d3.json(url_app).then(function(data){

    for (var i = 0; i<data.length;i++){

        var datapoint = data[i];
        city_test.push({name: datapoint[0], location: [datapoint[1],datapoint[2]], cases: datapoint[3]})
 
    };

    // Loop through the cities array and create one marker for each city object
 
    for (var i = 0; i < city_test.length; i++) {
      
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
      L.circle(city_test[i].location, {
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: city_test[i].cases * 5
      }).bindPopup("<h1>" + city_test[i].name + "</h1> <hr> <h3>Cases: " + city_test[i].cases + "</h3>").addTo(myMap);
  };

})};

mapData();
