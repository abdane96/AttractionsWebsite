/****************NavBar*****************/
setTimeout(function(){
	changeNavBarColor();
}, 1000);


/****************SlideShow***************/
var slideIndex = 1;
var myTimer;
var H1text;

slideShow(slideIndex);

myTimer = setInterval(function(){	
	plusSlides(1);
}, 5000);

var mc = new Hammer(document.getElementById('top-div')); //For swiping slides on phones
mc.on("swipeleft", function(event) {
    plusSlides(1);
});
mc.on("swiperight", function(event) {
    plusSlides(-1);
});


/****************Google Maps***************/
initialize();
var map;
var service;
var infowindow;

function initialize() {
	var pyrmont = new google.maps.LatLng(45.420422,-75.692429);
	
	map = new google.maps.Map(document.getElementById('map'), {
	  center: pyrmont,
	  zoom: 15
	});
	
	var request = {
		location: pyrmont,
		radius: '5000',
		type: ['restaurant']
	};
	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
		  var place = results[i];
		  createMarker(results[i], results, i);
		}
	}
}

function createMarker(place, places, Index) {

	var infowindow = new google.maps.InfoWindow();
	
	
	var marker = new google.maps.Marker({
	    position: place.geometry.location,
	    map: map
	});
	
	marker.addListener('click', function() {
		infowindow.setContent('<div><strong>' + place.name + '</strong><br>');
		infowindow.open(map, this);
		places.forEach(function(element, index){
			if(index == Index){
				infowindow.close(map, element);
			}
		});
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
	var i;
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

function changeNavBarColor(){

	var sectionsJQ = $('.sections');
	var sections = [];

	sections.push({
			color: '#333',
			top: 0,
			H1: '',
	});

	sectionsJQ.each(function(){
		sections.push({
			color: $(this).css('background-color'),
			top: $(this).offset().top,
			H1: $('#'+$(this).attr('id')+' h1').text(),
		});		
	});
	$(document).ready(function(){
		$(window).scroll(function (event) {
			var currentPosition = $(window).scrollTop();
			sections.forEach(function(element, index){
				if(index < sections.length-1){
					if(currentPosition >= element.top && currentPosition < sections[index+1].top){
						H1text = element.H1;
						fixH1(H1text);
						$('.navbar').css('background-color', element.color);		
						$(window).resize(function(){
							fixH1(H1text);
						});				
					}
				}else{
					//on the last div
					if(currentPosition > element.top){
						H1text = element.H1;
						fixH1(H1text);
						$('.navbar').css('background-color', element.color);
						$(window).resize(function(){
							fixH1(H1text);
						});
					}
				}				
			});
		});
	});
}

function fixH1(text){
	$('#add-h1').replaceWith('<span id="add-h1">' + text + '</span>');
	if($(window).width() >= 975){
		$('#add-h1').css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'z-index': '1'
		});
		var textSize = $("#add-h1").width();
		$("#add-h1").css('margin-left', ($(".navbar").width()/2.1)-textSize/100);
	}
}
