# earthquake-geomapping

Geomap using Leaflet.js to track seismic activity across the world in the past 7 days using updated data published by the United States Geological Survey (USGS) Earthquakes Hazards Program. Map utilizes markers that illustrate location, depth, and magnitude of the earthquake, as well as pop-up boxes that provide descriptive information about the earthquake, including the date and time that the activity was detected. Map also makes use of Leaflet layers to view earthquake data superimposed on a topographical map with tectonic plate boundaries to contextualie the regions with the greatest seismic acivity.


## Data

Data is extracted from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). The USGS provides data updated on a by-minute basis for earthquakes of various magnitude ranges that occurred within the past hour, past day, past week, or past 30 days. This analysis incorporates all earthquakes from within the past week (JSON located [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)).

## Technologies

JavaScript, Leaflet