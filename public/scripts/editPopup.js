var popup = $(".editPopUp");

$(".editButton").on( "click", function(){
    $(".profileBody").css('filter', 'blur(5px)');
    popup.show();
});

$(document).mouseup(function(e){
    
    // if the target of the click isn't the container nor a descendant of the container
    if (!popup.is(e.target) && popup.has(e.target).length === 0) 
    {
        console.log(e.target);
        $(".profileBody").css('filter', 'none');
        popup.hide();
    }
});