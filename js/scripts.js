$(document).ready(function() {
    const portfolioSection = $('#portfolio');
    const horizontalScroll = portfolioSection.find('.horizontal-scroll');
    let isScrollingHorizontally = false;

    $(window).on('scroll', function() {
        const scrollPos = $(document).scrollTop();
        const portfolioTop = portfolioSection.offset().top;
        const portfolioBottom = portfolioTop + portfolioSection.outerHeight();

        if (scrollPos >= portfolioTop && scrollPos < portfolioBottom) {
            // Enable horizontal scroll within the portfolio section and disable vertical scroll
            if (!isScrollingHorizontally) {
                $('html, body').css('overflow', 'hidden');  // Disable vertical scroll
                $(window).on('mousewheel DOMMouseScroll', function(event) {
                    event.preventDefault();
                    const delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                    horizontalScroll.scrollLeft(horizontalScroll.scrollLeft() - delta);

                    // Check if the horizontal scroll has reached the end
                    if (horizontalScroll.scrollLeft() + horizontalScroll.innerWidth() >= horizontalScroll[0].scrollWidth) {
                        $('html, body').css('overflow', 'auto');  // Enable vertical scroll
                    }
                });
                isScrollingHorizontally = true;
            }
        } else {
            // Disable horizontal scroll and re-enable vertical scroll outside the portfolio section
            if (isScrollingHorizontally) {
                $('html, body').css('overflow', 'auto');  // Enable vertical scroll
                $(window).off('mousewheel DOMMouseScroll');
                isScrollingHorizontally = false;
            }
        }

        // Highlight current section in navigation
        $('nav ul li a').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr("href"));
            const sectionTop = refElement.position().top - 200;
            const sectionBottom = sectionTop + refElement.outerHeight();

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });

    // Smooth scrolling for navigation links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});
