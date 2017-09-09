var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Hintergrundkarte &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});

    map.setView(new L.LatLng(53.54, 10), 11);
    map.addLayer(osm);
    data.forEach(function(element) {
	var a=element.st_astext.replace("MULTILINESTRING((","").replace("))","");
	var toarr=[];
	a.split(",").forEach(function(cord) {
	    c=cord.split(" ");
	    
	    console.log([Number(c[1]),Number(c[0])]);
	    toarr.push([Number(c[1]),Number(c[0])]);
	    
	});
	console.log(toarr);
	var pl=new L.Polyline(toarr);
	pl.setStyle({
	    color: 'red'
	});
	pl.bindPopup('ID: '+element.id+ '<br>NO2:'+ element.gno2_mk);
	pl.addTo(map);
    });
}



