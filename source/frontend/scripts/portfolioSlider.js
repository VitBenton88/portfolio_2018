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

const leftArrowApps = $('.portfolio-slider.app-projects .fa-chevron-circle-left');
const rightArrowApps = $('.portfolio-slider.app-projects .fa-chevron-circle-right');
const leftArrowBml = $('.portfolio-slider.bml-projects .fa-chevron-circle-left');
const rightArrowBml = $('.portfolio-slider.bml-projects .fa-chevron-circle-right');
const portfolioSliderApps = $('.portfolio-slider.app-projects');
const portfolioSliderBml = $('.portfolio-slider.bml-projects');

$(document).ready(() => {
    //init slider
    portfolioSliderApps.slick(sliderSettings);
    portfolioSliderBml.slick(sliderSettings);

    //leveraging slick methods
    //custom next slide event
    rightArrowApps.click(() => {
      portfolioSliderApps.slick('slickNext');
    });
    //custom prev slide event
    leftArrowApps.click(() => {
      portfolioSliderApps.slick('slickPrev');
    });
    rightArrowBml.click(() => {
      portfolioSliderBml.slick('slickNext');
    });
    //custom prev slide event
    leftArrowBml.click(() => {
      portfolioSliderBml.slick('slickPrev');
    });
});
