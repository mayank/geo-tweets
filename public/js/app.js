var socket = io.connect(location.href);
var map;
var markerTimeout = 2*70*1000;
var markerList = [];
var _coords = {};

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
	})

    map.addListener('center_changed', function(){
    	_coords = map.getCenter();
        socket.emit('register', _coords)
    })
}

socket.on('mark', function(status){
	$('#search').removeAttr('disabled')
	
	var marker = new google.maps.Marker({
	    position: status.coords,
	    title: status.tweet,
	    icon: '/img/icon.gif'
	});
	marker.setMap(map);	
	setTimeout(function(){ marker.setMap(null); delete marker; }, markerTimeout);
})

$(document).ready(function(){
	navigator.geolocation.getCurrentPosition(function(pos){
		_coords = {lat: pos.coords.latitude, lng: pos.coords.longitude};
		socket.emit('register', _coords)
		initMap()
	});

	$('#search').keyup(function(e){
		if(e.keyCode == 13){
			$('#search').attr('disabled','disabled')
		}
		var coordsObj = _coords;
		coordsObj.search = $('#search').val()
		socket.emit('register', coordsObj)
	})
});

