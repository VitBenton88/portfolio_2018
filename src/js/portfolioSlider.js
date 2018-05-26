const sliderSettings = {
    arrows: false,
    cssEase: 'linear',
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          fade: false,
        }
      }
    ]
}

const leftArrow = $('.fa-chevron-circle-left');
const rightArrow = $('.fa-chevron-circle-right');
const portfolioSlider = $('.portfolio-slider');

$(document).ready(() => {
    //init slider
    portfolioSlider.slick(sliderSettings);

    //leveraging slick methods
    //custom next slide event
    rightArrow.click(() => {
        portfolioSlider.slick('slickNext');
    });
    //custom prev slide event
    leftArrow.click(() => {
        portfolioSlider.slick('slickPrev');
    });
});
