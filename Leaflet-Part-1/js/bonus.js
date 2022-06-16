url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(url).then(tectonic);

function tectonic(response) {

    var data = response.features;
    var tectonicCoords = [];
    for (var i = 0; i < data.length; i++) {
        var coordinates = data[i].geometry.coordinates
        var latlon = [];
        for (var j = 0; j < coordinates.length; j++) {
            var lat = coordinates[j][1];
            var lon = coordinates[j][0];
            latlon.push([lat,lon]);
            // console.log(coordinates.length);
        }
        tectonicCoords.push(latlon);
    }
    // console.log(tectonicCoords);
    return tectonicMap(tectonicCoords);
}

function tectonicMap(tectonicCoords) {

    var map = L.map('map').setView([39.8283,-98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var polyline = L.polyline(tectonicCoords, {color: 'orange'}).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

}

