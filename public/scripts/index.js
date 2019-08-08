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
//changeNavBarColor();
//}, 1000);

animateHoverNavBar()

// $(window).on('scroll', function () {
//   // if($(document).scrollTop()){
// 	var pixs = $(document).scrollTop()
// 	pixs = pixs / 100;
// 	$("body").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" })
//     //}
// });

function animateHoverNavBar(){
	var dropDowns = $('div[class*="-dropdown-content"]');
	
	dropDowns.each(function(){
		var dropdownWord = $(this).attr('class').replace('-dropdown-content', '');
		
		$(".all-dropdown:has(div."+dropdownWord+"-dropdown-content)").hover(function(){
			var length = $("."+dropdownWord+"-dropdown-content"+" .all-dropdown-links").length;
			var infoLinks = $("."+dropdownWord+"-dropdown-content"+" .all-dropdown-links");
			infoLinks.each(function(){
				$(this).css('padding-left', length/3+'em');
			})
			$("."+dropdownWord+"-dropdown-content").slideDown();
			
		}, function(){
			$("."+dropdownWord+"-dropdown-content").slideUp(200);
		});
	})
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
			if(currentPosition > navBarHeight+20){
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
