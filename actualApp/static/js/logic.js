// Create a map object
var myMap = L.map("map", {
  center: [43.6532, -79.3832],
  zoom: 5
});
var corner1 = L.latLng(45, -83),
corner2 = L.latLng(41, -75),
bounds = L.latLngBounds(corner1, corner2);

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //tileSize: 1024,
  //maxZoom: 10,
  minZoom: 6,
  //zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

myMap.fitBounds(bounds);
myMap.setMaxBounds(myMap.getBounds());

// Country data
var countries = [
  {
    name: "Toronto",
    location: [43.6532, -79.3832],
    points: 227
  },
  {
    name: "Mississauga",
    location: [43.5890, -79.6441],
    points: 218
  },
  {
    name: "vaughan",
    location: [43.8563, -79.5085],
    points: 156
  }
];


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].points > 200) {
    color = "yellow";
  }
  else if (countries[i].points > 100) {
    color = "blue";
  }
  else if (countries[i].points > 90) {
    color = "green";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 1500
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
}
