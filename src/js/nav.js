//VARIABLES

const navIcon = $('#nav-icon');
const mobileMenu = $('.mobile-nav-menu');
const mobileMenuLinks = $('.mobile-nav-menu a');
let mobileMenuOpen = false;

//FUNCTIONS

const fadeMobileMenu = (action) => {
    if (action == 'in') {
        displayMobileMenu('show');
        mobileMenu.animate({
            opacity: 1
        }, 'fast');
        mobileMenuLinks.animate({
            opacity: 1,
            marginRight: 0
        }, 'fast');
    } else if (action == 'out') {
        mobileMenuLinks.animate({
            opacity: 0,
            marginRight: 200
        }, 'fast');
        mobileMenu.animate({
            opacity: 0
        }, 'fast');
    }
};

const displayMobileMenu = (action) => {
    if (action == 'show') {
        mobileMenu.css('visibility', 'visible');
        mobileMenuLinks.css('visibility', 'visible');
    } else if (action == 'hide') {
        mobileMenu.css('visibility', 'hidden');
        mobileMenuLinks.css('visibility', 'hidden');
    }
};

// CLICK EVENTS

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
