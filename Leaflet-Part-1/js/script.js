// function that takes earthquake marker layer as input and creates map
function createMap(markerLayer) {

    var map = L.map('map').setView([39.8283,-98.5795], 4);

    var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    var earthquakeLayer = L.layerGroup(markerLayer);

    var baseLayers = {
        "OpenStreetMap": base
    };
    
    var overlays = {
        "Earthquakes": earthquakeLayer
    };
    
    L.control.layers(baseLayers, overlays).addTo(map);
  
}

let geoJson = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

d3.json(geoJson).then(function(response) {

    let earthquakes = response.features;
    let markerLayer = [];

    for (let i = 0; i < earthquakes.length; i++) {
        let lat = earthquakes[i].geometry.coordinates[1];
        let lon = earthquakes[i].geometry.coordinates[0];
        let depth = earthquakes[i].geometry.coordinates[2];
        let magnitude = earthquakes[i].properties.mag;

        let marker = L.circleMarker([lat,lon],{
            radius : magnitude * 2.5,
            fillColor : pinColor(depth),
            fillOpacity : 1,
            color : 'black',
            weight : .5
        })
        .bindPopup(`${earthquakes[i].properties.place} <br> Magnitude: ${magnitude}`)

        markerLayer.push(marker);
    }
    // console.log(markerLayer[0]);
    createMap(markerLayer);

})



// OpenStreetMap.addTo(map);

function pinColor(depth) {
    if (depth < 10) {
        color = "#9bf708";
    }
    else if (depth < 30) {
        color = "#eaff99";
    }
    else if (depth < 50) {
        color = "#f5ba0a";
    }
    else if (depth < 70) {
        color = "#eead11";
    }
    else if (depth < 90) {
        color = "#f0820f"
    }
    else color = "#f3460c";

    return color
}