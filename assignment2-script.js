/* Creating bbox parameters*/

var myPosition;

function getBox(){
    return [-0.07947921752929688, 39.98619605209568, -0.04978179931640625, 40.00000497268461];
}

function getCurrentPositionMoreAccurate(){

    map.locate({setView: true, watch: true})
    .on('locationfound', function(e){
        currentPosition=[e.longitude,e.latitude];
        viewMyPositionInMap(currentPosition);
    })
   .on('locationerror', function(e){
        displayError('permissionDenied');
    });

    return currentPosition;
}

function getMyPosition(){
    navigator.geolocation.getCurrentPosition(viewMyPositionInMap, displayError);
}

function viewMyPositionInMap(position) {

    myPosition=[position.coords.longitude,position.coords.latitude];
    leafletAddPointToMap(position.coords.longitude,position.coords.latitude,true);

    return myPosition;
}

function displayError(error) {
    alert("Unable to retrieve your location");
}

/** Generating random points */
function handleRamdomPoints() { 
      //Get random points -- to know how many rows
      let numPoints=document.getElementById('num').value;
      if(numPoints<=0){
          alert('You have to increase the number of desired points!');
      }
      
      updateTable(numPoints);
}

function updateTable(points) {
    deleteTableRows();
    deleteFeatures();

    let area=getBox();
    let rowData=turfGenerateRamdomPoints(points,area)['features'];

    for(let i=0;i<points;i++){
        createRow(i,rowData)
    }
 }

 function deleteTableRows() {
         let actual=document.getElementById('tbl').getElementsByTagName('tbody')[0]['rows']['length'];
   
         if(actual>0){
                 document.getElementById('tbl').getElementsByTagName('tbody')[0].innerHTML="";
         }
 }



 function createRow(id, point) {
    let tablePoints=document.getElementById('tbl').getElementsByTagName('tbody')[0];
    let row=tablePoints.insertRow();
    let lat = row.insertCell(0);
    let lon = row.insertCell(1);
    let button = row.insertCell(2);
    lat.innerHTML = point[id]['geometry']['coordinates'][0].toFixed(5);
    lon.innerHTML = point[id]['geometry']['coordinates'][1].toFixed(5);

    let btn = document.createElement("button");
    let title = document.createTextNode("View");
    btn.appendChild(title);
    btn.setAttribute("id", id);
    btn.setAttribute("onclick",'handleView(this.id)');
    
    button.appendChild(btn);
 }

 /*
Name: handleView
Desc: Show the point (the one in the same row than the button) on the map, hide the view button and show the distance button
*/
 function handleView(rowId) {
   let points=document.getElementById("tbl").getElementsByTagName('tbody')[0].rows[rowId].cells;
   leafletAddPointToMap(points[0]['innerText'], points[1]['innerText'],false);
   document.getElementById(rowId).hidden=true;
   
   let button = points[2];

   let btn = document.createElement("button");
   let title = document.createTextNode("Distance");
   btn.appendChild(title);
   btn.setAttribute("id", rowId);
   btn.setAttribute("onclick",'handleDistance(this.id)');
   
   button.appendChild(btn);
}


/************************************
Custom functions to handle action buttons
*/
/*
Name: handleBoundingBox
Desc: Show bounding box (polygon) on the map
*/
function handleBoundingBox() {
    let area=getBox();
    leafletAddPolygonToMap(area);
}

/*
Name: handleDistance
Desc: Compute the distance between two points, "my position" and current selection, by calling convenient method;
hide the distance button, and show distance label.
In case that "my position" is not ready, show a warning message by calling alert().
*/
function handleDistance(rowId) {

    if (myPosition==undefined){
        alert('Please allow your location from your browser!');
    }else{
        //getPoint values
    let points=document.getElementById("tbl").getElementsByTagName('tbody')[0].rows[rowId].cells;
    let pointCoord=[points[0]['innerText'], points[1]['innerText']];
    //calculate distance
    let distance= turfDistance(myPosition,pointCoord);
    leafletAddLineToMap(myPosition,pointCoord);
    //change label
    document.getElementById(rowId).hidden=true;

    let button = points[2];
    button.innerHTML=distance+' km';

    
    }
    
}