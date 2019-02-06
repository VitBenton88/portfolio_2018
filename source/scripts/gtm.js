const socialLinks = $('.social-icon-wrap a i');

//track social link clicks
socialLinks.click( function() {
    console.log('social click');
    let socialChannel = "";
    if ($(this).hasClass('fa-stack-overflow')) {
        socialChannel = "Stack Overflow";
    } else if ($(this).hasClass('fa-linkedin')) {
        socialChannel = "Linkedin";
    } else {
        socialChannel = "GitHub";
    }

    dataLayer.push({
        'event': 'social-click',
        'social': socialChannel
      });
});