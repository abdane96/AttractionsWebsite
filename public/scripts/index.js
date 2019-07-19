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
