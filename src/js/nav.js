const navIcon = $('#nav-icon');
const mobileMenu = $('.mobile-nav-menu');
const mobileMenuLinks = $('.mobile-nav-menu a');
let mobileMenuOpen = false;

fadeMobileMenu = (action) => {
    if (action == 'in') {
        mobileMenu.animate({
            opacity: 1
        }, 'fast');
        mobileMenuLinks.animate({
            opacity: 1,
            marginRight: 0
        }, 'fast');
    } else {
        mobileMenuLinks.animate({
            opacity: 0,
            marginRight: 200
        }, 'fast');
        mobileMenu.animate({
            opacity: 0
        }, 'fast');
    }
};

navIcon.click(function() {
    $(this).toggleClass('open');
    if (!mobileMenuOpen) {
        fadeMobileMenu('in');
        mobileMenuOpen = !mobileMenuOpen;
    } else {
        fadeMobileMenu('out');
        mobileMenuOpen = !mobileMenuOpen;
    }
});

mobileMenuLinks.click(()=> {
    fadeMobileMenu('out');
    navIcon.removeClass('open');
    mobileMenuOpen = !mobileMenuOpen;
});
