/****************SlideShow***************/
var slideIndex = 1;
var myTimer;
//var H1text;

slideShow(slideIndex);

myTimer = setInterval(function(){	
	plusSlides(1);
}, 5000);

var mc = new Hammer(document.getElementById('activities-div')); //For swiping slides on phones
mc.on("swipeleft", function(event) {
    plusSlides(1);
});
mc.on("swiperight", function(event) {
    plusSlides(-1);
});


/****************Google Maps***************/

initMap();
var map;
var service;
var infowindow;

function initMap() {
	var ottawa = new google.maps.LatLng(45.4215, -75.6972);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), {center: ottawa, zoom: 15});

    var request = {
    	location: ottawa,
		radius: '5000',
		types: ["restaurant"]
    };

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
    		for (var i = 0; i < results.length; i++) {
        		createMarker(results[i]);
        	}

    		map.setCenter(results[0].geometry.location);
		}
    });
}

function createMarker(place) {
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

    google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
    });
}

/****************Functions***************/

function currentSlide(n){
	clearInterval(myTimer);
	myTimer = setInterval(function(){
		plusSlides(n+1);
	}, 5000);
	slideShow(slideIndex = n);
}

function plusSlides(n){
	var slides = $(".images");
	clearInterval(myTimer);
	if(n < 0){
		if(slideIndex == 1){
			slideShow(slideIndex-=2);
		}else{
			slideShow(slideIndex--);
		}		
	}else{
		if(slideIndex == slides.length){
			slideShow(slideIndex+=2);
		}else{
			slideShow(slideIndex++);
		}
	}

	if(n === -1){
		myTimer = setInterval(function(){
			plusSlides(n+2);
		}, 5000);		
	}else{
		myTimer = setInterval(function(){
			plusSlides(n+1);
		}, 5000);
	}	
}

function slideShow(n){
	var slides = $(".images");
	var dots = $(".dot");

	if(n>slides.length){
		slideIndex = 1;
	}
	if(n<1){
		slideIndex = slides.length;
	}

	slides.each(function(){
		$(this).css('display', 'none');
	});

	dots.each(function(){
		$(this).removeClass('active');
	});

	slides.each(function(index){
		if(index == slideIndex-1){
			$(this).fadeIn(1000);
		}
	});

	dots.each(function(index){
		if(index == slideIndex-1){
			$(this).addClass('active');
		}
	});
}

// function fixH1(text){
// 	$('#add-h1').replaceWith('<span id="add-h1">' + text + '</span>');
// 	if($(window).width() > 980){
// 		$('#add-h1').css({
// 			'position': 'absolute',
// 			'top': '0',
// 			'left': '0',
// 			'z-index': '1'
// 		});
// 		var textSize = $("#add-h1").width();
// 		$("#add-h1").css('margin-left', ($(".navbar").width()/2.1)-textSize/100);
// 	}
// }
