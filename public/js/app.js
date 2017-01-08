var socket = io.connect(location.href);
var map;
var markerTimeout = 2*70*1000;
var markerList = [];
var _coords = {};
var _query = '';
var _markerMap = [];
var _moverTimeout = 0;

// map initialization
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: _coords,
		styles: _googleMapStyle,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: false,
		rotateControl: true,
		fullscreenControl: true
	});

    map.addListener('center_changed', onMapChanged);
}

// when map is dragged
function onMapChanged(){
	clearTimeout(_moverTimeout);
	_moverTimeout = setTimeout(function(){
		var latlng = map.getCenter();
    	
    	_coords.lat = latlng.lat();
    	_coords.lng = latlng.lng();
        socket.emit('register', _coords);

	}, 2000);
};

// insert marker to map
function insertMarkerToMap() {
	var marker = new google.maps.Marker({
	    position: status.coords,
	    title: status.tweet,
	    icon: '/img/icon.gif'
	});
	marker.setMap(map);
	return marker;	
}

// remove marker after some time
function setTimeoutToMarker(marker) {
	_markerMap.push(marker);
	marker.uid = _markerMap.length-1;
	
	setTimeout(function(){ 
		marker.setMap(null); 
		delete delete _markerMap.marker.uid;
		delete marker;  
	}, markerTimeout);
}

// recieve data on server push
socket.on('mark', function(status){
	$('#search').removeAttr('disabled')
	
	var marker = insertMarkerToMap();
	setTimeoutToMarker(marker);
});

// remove all markers
function clearOverlays() {
	for(indx in _markerMap){
		_markerMap[indx].setMap(null);
		delete _markerMap[indx];
	}
}

// conduct search
function enableSearch() {
	$('#search').keyup(function(e){

		// onpressing enter
		if(e.keyCode == 13){
			$('#search').attr('disabled','disabled');
			clearOverlays();

			_coords.query = $('#search').val();
			socket.emit('register', _coords);
		}
	});
}


$(document).ready(function(){
	// get location via HTML5 API
	navigator.geolocation.getCurrentPosition(function(pos){
		_coords = {lat: pos.coords.latitude, lng: pos.coords.longitude, query: _query};
		socket.emit('register', _coords)
		initMap()
	});

	enableSearch();
});

