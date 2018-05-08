//VARIABLES
const copyrightSpan = $('#copyrightYear');
const currentYear = (new Date()).getFullYear();

//set current year for copyright year in footer
copyrightSpan.html(`&copy; ${currentYear}`);
