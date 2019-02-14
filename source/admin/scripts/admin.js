/**
* INIT
**/


//initialize Froala editors
$(function() { 
    $('#aboutEditor').froalaEditor();
    $('#portfolioIntroEditor').froalaEditor();
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