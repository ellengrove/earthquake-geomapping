// function that takes earthquake marker layer as input and creates map
function createMap(markerLayer) {

    var map = L.map('map').setView([39.8283,-98.5795], 4);

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    var USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });

    var earthquakeLayer = L.layerGroup(markerLayer);

    var baseLayers = {
        "OpenStreetMap" : osm,
        "U.S. Geogological Survey" : USGS_USImagery
    };
    
    var overlays = {
        "Earthquakes": earthquakeLayer
    };
    
    osm.addTo(map);
    earthquakeLayer.addTo(map);

    L.control.layers(baseLayers, overlays).addTo(map);

    // Set up the legend.
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map){
        var div=L.DomUtil.create('div','legend');
        var labels=["-10-10","10-30",
                    "30-50","50-70","70-90","90+"];
        var grades = [9,29,49,69,89,91];
        div.innerHTML=`<div><center><b>Depth</b></center></div`;
        for (var i = 0; i < grades.length; i++){
            div.innerHTML+=`<li> <span style="background-color: ${pinColor(grades[i])}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ${labels[i]}</li>`; 
        }
        console.log(div);
        return div;
    }
    legend.addTo(map);
    // console.log(legend);

  // Adding the legend to the map
//   legend.addTo(myMap);
  
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
        // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        let time = timeConverter(earthquakes[i].properties.time);

        let marker = L.circleMarker([lat,lon],{
            radius : magnitude * 2.5,
            fillColor : pinColor(depth),
            fillOpacity : 1,
            color : 'black',
            weight : .5
        })
        .bindPopup(`<center>${time}</center> <hr> <center> Magnitude: ${magnitude} </center>`)

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

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var date = month + ' ' + date + ' ' + year + ' ' + addZero(hour) + ':' + addZero(min) + ':' + addZero(sec) ;

    return date;
  }

  function addZero(time) {
    if (time < 10) {
        newTime = '0' + time;
    }
    else newTime = time;
    return newTime;
  }