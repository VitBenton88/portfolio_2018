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

//toggle add overlays
$('.add-item-overlay, .add-project-overlay').click(function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
})

//add new product detail input
$('.add-project-detail').click(() => {
    const productDetailInput = '<input name="details" class="form-control" type="text" aria-describedby="details-help" placeholder="Project Detail">';
    $('.project-detail').after(productDetailInput);
})

//handle project bullet deletions via AJAX
$('.delete-project-bullet').click(function() {
    const bulletid = $(this).data('bulletid');
    const projectid = $(this).data('projectid');
    const _id = $(this).data('_id');
    $.post("/deleteprojectbullet", {bulletid, _id, projectid}, () => location.reload());
})