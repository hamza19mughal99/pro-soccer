/*global $, jQuery, alert*/
(function ($) {
    "use strict";

    $('body').animate({ opacity: 1 }, 600);

    // Parallax

    var isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isBlink, isMob;
    isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    isFirefox = typeof InstallTrigger !== 'undefined';
    isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    isIE = navigator.userAgent.indexOf("MSIE ");
    isEdge = !isIE && !!window.StyleMedia;
    isChrome = !!window.chrome && !!window.chrome.webstore;
    isBlink = (isChrome || isOpera) && !!window.CSS;
    isMob = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    if (isChrome || isFirefox || isSafari) {
        if ($(window).width() > 992) {
            $('.parallax').vossenParallax();
        };
        $(window).scroll(function () {
            function parallaxHero() {
                var scrolled = $(window).scrollTop();
                if ($(window).width() > 992) {
                    $('.map-parallax').css('top', -(scrolled * 0.4) + 'px');
                    $(".slide").css({ transform: 'translate3d(0px, ' + (scrolled * 0.4) + 'px, 0px)' });
                }
            }
            parallaxHero();
        });
    }

    $(window).load(function () {
        $('.parallax-bg img').animate({ opacity: 1 }, 1000);
        $('.white-until-load').css({ color: "#191a1c" });
    });

    // Header Dropdown

    $('.dropdown-toggle, .dropdown-submenu>a').click(function () {
        $(this).closest('.dropdown').siblings().removeClass('open');
        $(this).closest('.dropdown').toggleClass('open');
        return false;
    });

    // Header Animation

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('nav').addClass("nav-small");
        } else {
            $('nav').removeClass("nav-small");
        }
        if ($(this).scrollTop() > 600) {
            $("#back-to-top").stop().animate({ opacity: '1' }, 150);
        } else {
            $("#back-to-top").stop().animate({ opacity: '0' }, 150);
        }
    });

    // Lighbox

    $(".gallery-item").magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        mainClass: 'my-mfp-slide-bottom'
    });
    $('.popup-youtube,.popup-vimeo,.popup-gmaps,.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    if ($("#popup-promo").length > 0) {
        $.magnificPopup.open({
            items: {
                src: '#popup-promo'
            },
            type: 'inline'
        });
    }

    // Search Modal

    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    // Smooth Scroll to Anchor

    $('body').on('click', "scroll-btn,.btn-scroll", function (event) {
        var $anchor = $(this);
        if ($(window).width() > 992) {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 53
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        } else {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top + 5
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    // Owl Sliders

    $(".hero-slider").owlCarousel({
        autoplay: true,
        items: 1,
        dots: false,
        nav: true,
        rewindNav: true,
        loop: true,
        rtl: true,
        navText: ["<img src='img/assets/slider-left-thin-arrow.png'>", "<img src='img/assets/slider-right-thin-arrow.png'>"]
    });

    $(".content-slider").owlCarousel({
        animateOut: 'bounceOut',
        animateIn: 'bounceIn',
        autoplay: true,
        autoplayTimeout: 2500,
        items: 1,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        loop: true,
        rtl: true
    });

    /*$(".team-slider").owlCarousel({
        autoplay : false,
        items: 3,
        dots: true,
        responsiveRefreshRate: 200,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });*/

    var testimonials = $(".testimonials").owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 700,
        loop: true,
        items: 1,
        dots: true,
        dotsSpeed: 400,
        // rtl: true,
    }).on("changed.owl.carousel", syncPosition);

    $(".testimonials-thumbs .item:first-child").addClass("active");

    function syncPosition(el) {
        //if loop is set to false, then you have to uncomment the next line
        //var current = el.item.index;

        //to disable loop, comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - 2);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        $(".testimonials-thumbs .item").removeClass("active");
        $(".testimonials-thumbs").find(".item:eq(" + current + ")").addClass("active");
    }

    $('body').on("click", ".testimonials-thumbs .item", function () {
        $(".testimonials").trigger('to.owl.carousel', $(this).index())
    })

    $("#clients-slider-2").owlCarousel({
        items: 4,
        lazyLoad: true,
        loop: true,
        margin: 10,
        // rtl: true,
        responsiveRefreshRate: 200,

        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 7
            },
            1200: {
                items: 9
            }
        }
    });

    $(".project-carousel,.slider-block-1").owlCarousel({
        autoplay: true,
        autoplayTimeout: 4000,
        loop: true,
        items: 1,
        dots: true,
        nav: true,
        rtl: true,
        navText: ["<img src='img/assets/slider-left-thin-arrow-dark.png'>", "<img src='img/assets/slider-right-thin-arrow-dark.png'>"]
    });

    $(".shop-product-slider").owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        nav: true,
        navText: ["<img src='img/assets/slider-left-thin-arrow-dark.png'>", "<img src='img/assets/slider-right-thin-arrow-dark.png'>"],
        dots: true,
        rtl: true,
        items: 1
    });

    $(".image-slider1,.image-slider2,.image-slider5,.image-slider6,.image-slider7").owlCarousel({
        nav: true,
        navText: ["<img src='img/assets/slider-left-thin-arrow.png'>", "<img src='img/assets/slider-right-thin-arrow.png'>"],
        slideSpeed: 300,
        dots: true,
        rtl: true,
        items: 1
    });

    $(".image-slider3,.image-slider4").owlCarousel({
        nav: false,
        dots: true,
        dotsSpeed: 400,
        items: 1,
        rtl: true
    });

    // Contact Form

    $('#contactform').submit(function () {
        var action = $(this).attr('action');

        $('#message').hide();
        $('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
        $.post(action, {
            page: window.location.href,
            reason: $('#reason').val(),
            referral: $('#referral').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            club: $('#club').val(),
            comments: $('#comments').val(),
            recaptchaResponse: $('#recaptchaResponse').val()
        },
            function (data) {
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown(250);
                $('#contactform img.loader').fadeOut('slow', function () { $(this).remove(); });
                $('#submit').removeAttr('disabled');
                if (data.match('success') !== null) {
                    $('#contactform').hide();
                }
            });

        return false;
    });

    $('#contactform-promo').submit(function () {
        var $that = $(this);
        var action = $(this).attr('action');
        $('#message').hide();
        $that.find('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
        setTimeout(
            function () {

                $.post(action, {
                    page: window.location.href,
                    option: $('input[type=radio][name=option]:checked').val(),
                    name: $('#name').val(),
                    email: $('#email').val(),
                    club: $('#club').val(),
                    function: $('#function').val(),
                    comments: $('#comments').val(),
                    type: $('#type').val(),
                    recaptchaResponse: $('#recaptchaResponse-promo').val()
                },
                    function (data) {
                        $that.find("#message").html(data).show();
                        //$('#message').slideDown(250);
                        $('#contactform-promo img.loader').fadeOut('slow', function () {
                            $(this).remove();
                        });
                        $that.find('#submit').removeAttr('disabled');

                        if (data.match('success') !== null) {
                            $('#message').show();
                            $that.hide();
                            //$('#contactform-event').fadeIn('slow');
                        }
                    });
            }, 1000);

        return false;
    });

    $('#contactform-sponsor').submit(function () {
        var $that = $(this);
        var action = $(this).attr('action');
        $('#message').hide();
        $that.find('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
        setTimeout(
            function () {

                $.post(action, {
                    page: window.location.href,
                    name: $that.find('#name').val(),
                    email: $that.find('#email').val(),
                    club: $that.find('#club').val(),
                    tournament: $that.find('#tournament').val(),
                    tournament_website: $that.find('#tournament_website').val(),
                    tournament_nr_teams: $that.find('#tournament_nr_teams').val(),
                    comments: $that.find('#comments').val(),
                    type: $that.find('#type').val(),
                    recaptchaResponse: $('#recaptchaResponse-sponsor').val()
                },
                    function (data) {
                        $that.parent().find("#message").html(data).show();
                        //$('#message').slideDown(250);
                        $('#contactform-sponsor img.loader').fadeOut('slow', function () {
                            $(this).remove();
                        });
                        $that.find('#submit').removeAttr('disabled');

                        if (data.match('success') !== null) {
                            $that.parent().find('#message').show();
                            $that.hide();
                            //$('#contactform-event').fadeIn('slow');
                        }
                    });
            }, 2000);

        return false;
    });

    $('#contactform-ecup').submit(function () {
        var $that = $(this);
        var action = $(this).attr('action');
        $('#message').hide();
        $that.find('#ecup-submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
        setTimeout(
            function () {

                $.post(action, {
                    page: window.location.href,
                    option: "ecup",
                    email: $('#ecup-email').val(),
                    club: $('#ecup-club').val()
                },
                    function (data) {
                        $that.find("#ecup-message").html(data).show();
                        //$('#message').slideDown(250);
                        $('#contactform-ecup img.loader').fadeOut('slow', function () {
                            $(this).remove();
                        });
                        $that.find('#ecup-submit').removeAttr('disabled');

                        if (data.match('success') !== null) {
                            $('#message').show();
                            $that.hide();
                            //$('#contactform-event').fadeIn('slow');
                        }
                    });
            }, 2000);

        return false;
    });

    $('#contactform-event').submit(function () {
        var $that = $(this);
        var action = $(this).attr('action');
        $that.find('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');


        $.post(action, {
            page: window.location.href,
            event: $('input[type=radio][name=event]:checked').val(),
            nr: $('#nr').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            club: $('#club').val(),
            function: $('#function').val()
        },
            function (data) {
                $that.find("#message").html(data).show();
                //$('#message').slideDown(250);
                $('#contactform-event img.loader').fadeOut('slow', function () {
                    $(this).remove();
                });
                $that.find('#submit').removeAttr('disabled');

                if (data.match('success') !== null) {
                    $that.hide();
                    $that.find("#message").show();
                }
            });

        return false;
    });

    $('#contactform-pricing').submit(function () {
        var $that = $(this);
        var action = $(this).attr('action');
        $('#message').hide();
        var addons = [];
        $.each($("input[name='addon']:checked"), function () {
            addons.push($(this).val());
        });
        console.log({
            addon: addons,
            name: $('#name').val(),
            email: $('#email').val(),
            club: $('#club').val(),
            subscription: $('#subscription').val(),
            contract: Pricing.currentContract
        });

        $that.find('#submit')
            .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
        setTimeout(
            function () {

                $.post(action, {
                    page: window.location.href,
                    addon: addons,
                    name: $('#name').val(),
                    email: $('#email').val(),
                    club: $('#club').val(),
                    subscription: $('#subscription').val(),
                    contract: Pricing.currentContract
                },
                    function (data) {
                        $that.find("#message").html(data).show();
                        //$('#message').slideDown(250);
                        $('#contactform-pricing img.loader').fadeOut('slow', function () {
                            $(this).remove();
                        });
                        $that.find('#submit').removeAttr('disabled');

                        if (data.match('success') !== null) {
                            $('#message').show();
                            $that.hide();
                            //$('#contactform-event').fadeIn('slow');
                        }
                    });
            }, 2000);

        return false;
    });

    //Subscribe form

    $('#subscribe-form,#subscribe-form2').on('submit', function (e) {
        e.preventDefault();
        var $el = $(this),
            $alert = $el.find('.form-validation'),
            $submit = $el.find('button'),
            action = $el.attr('action');
        $submit.button('loading');
        $alert.removeClass('alert-danger alert-success');
        $alert.html('');
        $.ajax({
            type: 'POST',
            url: action,
            data: $el.serialize() + '&ajax=1',
            dataType: 'JSON',
            success: function (response) {
                $alert.removeClass('hidden');
                if (response.status === 'error') {
                    $alert.html('<strong>' + response.message + '</strong>');
                    $alert.addClass('alert-danger').fadeIn(500);
                } else {
                    $el.trigger('reset');
                    $alert.html('<strong>' + response.message + '</strong>');
                    $alert.addClass('alert-success').fadeIn(500);
                }
                $submit.button('reset');
            }
        });
    });

    // Progress Bars

    $('.progress-bars,.progress-bars-2,.progress-bars-3,.progress-bars-4').waypoint(function () {
        $('.progress').each(function () {
            $(this).find('.progress-bar').animate({
                width: $(this).attr('data-percent')
            }, 800);
        });
    }, { offset: '100%', triggerOnce: true });

    // Progress Circles 

    $('.progress-circle').waypoint(function () {
        var totalProgress, progress, circles;
        circles = document.querySelectorAll('.progress-svg');
        for (var i = 0; i < circles.length; i++) {
            totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
            progress = circles[i].parentElement.getAttribute('data-circle-percent');
            circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
        }
    }, { offset: '70%', triggerOnce: true });

    // Counter Up

    $('.counter h1').counterUp({
        delay: 8,
        time: 1400
    });

    // Countdown

    $(function () {
        var dateUser, deadline, interval;
        dateUser = $("#countdown-timer").attr('data-date');
        deadline = new Date(dateUser);
        function updateClock() {
            var today, diff, seconds, minutes, hours, days, months;
            today = Date();
            diff = Date.parse(deadline) - Date.parse(today);
            if (diff <= 0) {
                clearInterval(interval);
            } else {
                seconds = Math.floor((diff / 1000) % 60);
                minutes = Math.floor((diff / 1000 / 60) % 60);
                hours = Math.floor((diff / 1000 / 60 / 60) % 24);
                days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5);
                months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);
                $("#months").text(('0' + months).slice(-2));
                $("#days").text(('0' + days).slice(-2));
                $("#hours").text(('0' + hours).slice(-2));
                $("#minutes").text(('0' + minutes).slice(-2));
                $("#seconds").text(('0' + seconds).slice(-2));
            }
        }
        interval = setInterval(updateClock, 1000);
    });

    // Accordions, Toggles, Tooltips, Tabs

    $('#accordion,#accordion2').on('show.bs.collapse', function () {
        $('#accordion .in').collapse('hide');
    });
    $("[data-toggle='tooltip']").tooltip();
    $(".alert").alert();
    $('#buttonTabs a,#iconTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Back to Top

    $('#back-to-top,.to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 700);
        return false;
    });

    // Instagram Feed

    $(function () {
        if ($('#instagram-feed').length) {
            $.fn.spectragram.accessData = {
                accessToken: '2985464939.7329358.026dd38d94c046c3aac748818d3c50c2',
                clientID: '7329358a04c0403c8389201ef5e4733b'
            };

            var instagramUser = document.getElementById("instagram-feed").getAttribute("data-instagram-username");
            $('#instagram-feed ul').spectragram('getUserFeed', {
                query: instagramUser,
                max: 8,
                size: 'small'
            });
        }
    });

    // Twitter Feed

    $(function () {
        if ($('#twitter-feed').length) {
            var twitterUser, tweets;
            twitterUser = document.getElementById("twitter-feed").getAttribute("data-twitter-widget-id");
            tweets = {
                "id": twitterUser,
                "domId": 'twitter-feed',
                "maxTweets": 2,
                "enableLinks": true,
                "showImages": false
            };
            twitterFetcher.fetch(tweets);
        }
    });

    // PortfolioGrid
    $('#js-grid').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 15,
        gapVertical: 15,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100
    });

    // Portfolio Metro 
    $('#js-grid-mosaic').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'mosaic',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 4
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 0,
        gapVertical: 0,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100
    });

    // Portfolio Fullwidth
    $('#js-grid-no-gutter').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 0,
        gapVertical: 0,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: ''
    });

    // Portfolio Masonry Fullwidth
    $('#js-masonry-fullwidth').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 4
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 15,
        gapVertical: 15,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100
    });

    // Portfolio Masonry Boxed
    $('#js-masonry-boxed').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 15,
        gapVertical: 15,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100
    });

    // Portfolio Carousel
    $('#js-grid-slider').cubeportfolio({
        layoutMode: 'slider',
        drag: true,
        auto: true,
        autoTimeout: 5000,
        autoPauseOnHover: true,
        showNavigation: false,
        showPagination: true,
        mediaQueries: [{
            width: 1680,
            cols: 3
        }, {
            width: 1350,
            cols: 3
        }, {
            width: 800,
            cols: 4
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        gapVertical: 30,
        caption: 'zoom',
        displayType: 'fadeIn',
        displayTypeSpeed: 400
    });

    // Blog Carousel
    $('#js-blog-carousel').cubeportfolio({
        layoutMode: 'slider',
        drag: true,
        auto: true,
        autoTimeout: 5000,
        autoPauseOnHover: true,
        showNavigation: false,
        showPagination: true,
        mediaQueries: [{
            width: 1680,
            cols: 4
        }, {
            width: 1350,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        gapVertical: 30,
        caption: 'zoom',
        displayType: 'fadeIn',
        displayTypeSpeed: 400
    });

    // Blog Masonry Fullwidth
    $('#blog-grid,#js-gallery-5').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: false,
        mediaQueries: [{
            width: 1500,
            cols: 5
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 600,
            cols: 2
        },
        {
            width: 440,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'fadeOutTop',
        gapHorizontal: 15,
        gapVertical: 15,
        caption: 'zoom',
        displayType: 'fadeInToTop',
        displayTypeSpeed: 1000
    });



    // Shop
    $('#shop-grid').cubeportfolio({
        filters: '#js-filters',
        layoutMode: 'grid',
        sortToPreventGaps: true,
        mediaQueries: [{
            width: 1500,
            cols: 4
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 2
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'sequentially',
        gapHorizontal: 30,
        gapVertical: 30,
        caption: 'zoom',
        displayType: 'sequentially',
        displayTypeSpeed: 100
    });

    var animationDelay = 2500,
        //loading bar effect
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
        lettersDelay = 50,
        //type effect
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        //clip effect
        revealDuration = 600,
        revealAnimationDelay = 1500;

    initHeadline();


    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function () { headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            };

            //trigger animation
            setTimeout(function () { hideWord(headline.find('.is-visible').eq(0)) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function () { showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

        } else if ($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ width: '2px' }, revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function () { hideWord(nextWord) }, barAnimationDelay);
            setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function () { hideWord(nextWord) }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, revealDuration, function () {
                setTimeout(function () { hideWord($word) }, revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () { hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else if ($bool) {
            setTimeout(function () { hideWord(takeNext($word)) }, animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () { showLetter($letter.next(), $word, $bool, $duration); }, $duration);
        } else {
            if ($word.parents('.cd-headline').hasClass('type')) { setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200); }
            if (!$bool) { setTimeout(function () { hideWord($word) }, animationDelay) }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }


}(jQuery));