var slideIndex = 1;
var myTimer;

slideShow(slideIndex);
setTimeout(function(){
	changeNavBarColor();
}, 100);

var H1text;


myTimer = setInterval(function(){	
	plusSlides(1);
}, 5000);

$("#left-arrow").on("click", function(){
	plusSlides(-1);
});

$("#right-arrow").on("click", function(){
	plusSlides(1);
});

var mc = new Hammer(document.getElementById('top-div'));
mc.on("swipeleft", function(event) {
    plusSlides(1);
});
mc.on("swiperight", function(event) {
    plusSlides(-1);
});

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
					if(currentPosition > element.top && currentPosition < sections[index+1].top){
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

function fixH1(div){
	$('#add-h1').replaceWith('<span id="add-h1">' + div + '</span>');
	if($(window).width() >= 975){
		$('#add-h1').css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'z-index': '1'
		});
		var textSize = $("#add-h1").width();
		$("#add-h1").css('margin-left', ($(".navbar").width()/2.2)-textSize/100);
	}
}
