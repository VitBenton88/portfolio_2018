/**
* INIT
**/


//initialize Froala editors
$(function() { 
    $('#aboutEditor, #portfolioIntroEditor').froalaEditor();
});

/**
* CLICK
**/

$('.add-item-overlay, .add-project-overlay').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
})