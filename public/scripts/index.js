/****************Flash***************/
if($(".flash").css('display') === 'block'){
	$(".navbar").css('box-shadow','none');
	$(".flash").css('box-shadow','0 2em 1em -1em #222');
}


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
