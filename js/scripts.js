$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Highlight current section in navigation
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();

        $('nav ul li a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            var sectionTop = refElement.position().top - 200; // Adjust this value as needed
            var sectionBottom = sectionTop + refElement.outerHeight();

            // If the scroll position is at the bottom of the page and the current section is the last section
            if (scrollPos + windowHeight >= documentHeight && currLink.attr("href") === "#contact") {
                $('nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });
});