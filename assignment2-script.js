/* Creating bbox parameters*/

function getBox(){
    return [-0.07947921752929688, 39.98619605209568, -0.04978179931640625, 40.00000497268461];
}


/* User Position Handlers*/
function addPoly(){
    let area=getBox();
    leafletAddPolygonToMap(area);
}

function getMyPosition(){
    map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            leafletAddPointToMap(e.longitude,e.latitude,true);
        })
       .on('locationerror', function(e){
            alert("If we cannot access you can not play X)");
        });
}

function viewMyPositionInMap(position) {

}

function displayError(error) { }



/** Generating random points */
function handleRamdomPoints() { }

function updateTable(points) {
    deleteTableRows();
 }

 function deleteTableRows() { }

 function createRow(id, point) { }

function fillTable(){
    //Clean table and existing rows
    let actual=document.getElementById('tbl').getElementsByTagName('tbody')[0]['rows']['length'];
    
    if(actual>0){
          //Disable button of randomness
            document.getElementById('btn-points').disabled=true;
            //document.getElementById('tbl').getElementsByTagName('tbody')[0].innerHTML="";     
    }

  
    //Get random points -- to know how many rows
    let numPoints=document.getElementById('num').value;
    if(numPoints<=0){
        alert('You have to increase the number of desired points!');
    }
    let area=getBox();
    let rowData=turfGenerateRamdomPoints(numPoints,area)['features'];
   
    //Draw Table Items

    let tablePoints=document.getElementById('tbl').getElementsByTagName('tbody')[0];
    
    for(let i=0;i<numPoints;i++){
        let row=tablePoints.insertRow();
        let lat = row.insertCell(0);
        let lon = row.insertCell(1);
        let button = row.insertCell(2);
        lat.innerHTML = rowData[i]['geometry']['coordinates'][0].toFixed(5);
        lon.innerHTML = rowData[i]['geometry']['coordinates'][1].toFixed(5);


        var btn = document.createElement("button");        // Create a <button> element
        var t = document.createTextNode("View");       // Create a text node
        btn.appendChild(t);                                // Append the text to <button>
        btn.setAttribute("id", i);
        btn.setAttribute("onclick",'drawPoint(this.id)');
        
        button.appendChild(btn);
    }
    //Draw map points
}

function drawPoint(id){
   let points=document.getElementById("tbl").getElementsByTagName('tbody')[0].rows[id].cells;
   console.log(points);
   leafletAddPointToMap(points[0]['innerText'], points[1]['innerText'],false);
}


/************************************
Custom functions to handle action buttons
*/
/*
Name: handleBoundingBox
Desc: Show bounding box (polygon) on the map
*/
function handleBoundingBox() { }
/*
Name: handleView
Desc: Show the point (the one in the same row than the button) on the map, hide the view button and show the distance button
*/
function handleView(rowId) { }
/*
Name: handleDistance
Desc: Compute the distance between two points, "my position" and current selection, by calling convenient method;
hide the distance button, and show distance label.
In case that "my position" is not ready, show a warning message by calling alert().
*/
function handleDistance(rowId) { }