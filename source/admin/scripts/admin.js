/**
* INIT
**/


//initialize Froala editor
$(function() { 
    $('#aboutEditor').froalaEditor();
});

/**
* CLICK
**/

$('.add-item-overlay').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
})