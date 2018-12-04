// Global variable poitne out a Leaflef map object
var map;

/*
Init a Leaflet map object.
*/
function leafletfInitMap(mapId){
    // initialize map container
    map = L.map(mapId).setView([39.994703663714745, -0.06909370422363281], 14);

    // get the stamen toner-lite tiles
    var Stamen_Toner = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });

    // add the tiles to the map
    Stamen_Toner.addTo(map); 

    //disable scroll wheel zoom 
    map.scrollWheelZoom.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.zoomControl.disable();
    
}

/* 
Add a pair lon-lat to the map. 
isMyposition is a boolean flag to determine the style of 
the circle marker. 
*/
function leafletAddPointToMap(lon, lat, isMyPosition) {
    if (map) {

        var defaultMarkerOptions = {
            glayer:'random',
            radius: 4,
            fillColor: "#FFC300",
            color: " #FFC300",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        var myPositionMarkerOptions = {
            glayer:"points",
            radius: 4,
            fillColor: "#16a085",
            color: "#16a085",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        var marker = turf.point([lon, lat]);
        L.geoJson(marker, {
            pointToLayer: function (feature, latlng) {
                if (isMyPosition) {
                    return L.circleMarker(latlng, myPositionMarkerOptions);
                } else {
                    return L.circleMarker(latlng, defaultMarkerOptions);
                }                
            }
        }).addTo(map);
    }
}

/* 
Add a line to the map by passing start and end points as input parameters. 
*/
function leafletAddLineToMap(pointFrom, pointTo) {

    // define coordinates for line
    var latlngs = [
        pointFrom,
        pointTo
    ];

    // add a marker to the map
    var line = turf.lineString(latlngs);
    L.geoJson(line, {color:"#900C3F",glayer:"lines"}).addTo(map);
}

/* 
Add a polygon to the map by passing a boundig box declaration as input parameter. 
*/
function leafletAddPolygonToMap(bbox) {
    cleanPolygon();

    var polygon = turfToPolygon(bbox);
    L.geoJson(polygon, {color:"#DABD83",glayer:"polygon"}).addTo(map);
}

/* 
Return a Turf Point object. 
*/
function turfToPoint(lon, lat) {
    return turf.point([lon, lat]);
}

/* 
Return a Turf Polygon object. 
*/
function turfToPolygon(bbox) {
    return turf.bboxPolygon(bbox);
}

/* 
Return "num" random points within a determined bounding box (bbox). 
*/
function turfGenerateRamdomPoints(num, bbox) {
    return turf.randomPoint(num, {bbox: bbox});
}

/* 
Return the distance (kms) between two points given as input parameters. 
*/
function turfDistance(pointFrom, pointTo) {
    var options = {units: 'kilometers'};
    var dist = turf.distance(pointFrom, pointTo, options);
    
    return parseFloat(dist).toFixed(2);
  }



  /*Custom*/
  /*
Clean the Layers for new selection of points
  */

  function deleteFeatures(){
     map.eachLayer(function (layer) {
    if(layer.defaultOptions){
        if(layer.defaultOptions['glayer']=='random' ||layer.options['glayer']=='lines'){
        map.removeLayer(layer);
        }
    }
    });   
  }

  function cleanPolygon(){
    map.eachLayer(function (layer) {    
        if(layer.options['glayer']=='polygon' ){
            map.removeLayer(layer);
        }
        });   
    
  }