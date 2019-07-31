/****************Footer***************/
checkFooterPosition();
function checkFooterPosition(){
	if ($("body").height() > $(window).height()) {
	    $("#footer").css({
	    	'position': 'relative',
	    	'height': '100%'
		});
	}
}

/****************NavBar***************/

//setTimeout(function(){
	changeNavBarColor();
//}, 1000);

animateHoverNavBar()




function animateHoverNavBar(){
	$(".all-dropdown:has(div.seasons-dropdown-content)").hover(function(){
		$(".seasons-dropdown-content").slideDown();
	}, function(){
		$(".seasons-dropdown-content").slideUp(200);
	});
	
	$(".all-dropdown:has(div.support-dropdown-content)").hover(function(){
		$(".support-dropdown-content").slideDown();
	}, function(){
		$(".support-dropdown-content").slideUp(200);
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
			var navBarHeight = $(".navbar").height();
			
			//Make navbar fixed after scrolling its height
			if(currentPosition > navBarHeight-10){
				$(".navbar").addClass("fixed-top");
			}else{
				$(".navbar").removeClass("fixed-top");
			}
			
			//Change navbar colors
			// sections.forEach(function(element, index){
			// 	if(index < sections.length-1){
			// 		if(currentPosition >= element.top-navBarHeight && currentPosition < sections[index+1].top+navBarHeight){
			// 			//H1text = element.H1;
			// 			//fixH1(H1text);
			// 			// $('.navbar').css('background-color', element.color);
			// 			// $('.dropdown').css('background-color', element.color);
			// 			// $(window).resize(function(){
			// 			// 	fixH1(H1text);
			// 			// });				
			// 		}
			// 	}else{
			// 		//on the last div
			// 		if(currentPosition > element.top-navBarHeight){
			// 			//H1text = element.H1;
			// 			//fixH1(H1text);
			// 			// $('.navbar').css('background-color', element.color);
			// 			// $('.dropdown').css('background-color', element.color);
			// 			// $(window).resize(function(){
			// 			// 	fixH1(H1text);
			// 			// });
			// 		}
			// 	}				
			// });
		});
	});
}
