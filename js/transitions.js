document
    .addEventListener("DOMContentLoaded", function () {
        var FadeTransition = Barba
            .BaseTransition
            .extend({
                start: function () {
                    Promise
                        .all([
                        this.newContainerLoading, this.fadeOut()
                    ])
                        .then(this.fadeIn.bind(this));
                },

                fadeOut: function () {
                    var deferred = Barba
                        .Utils
                        .deferred();

                    TweenMax.to(this.oldContainer, 0.3, {
                        opacity: 0,
                        onComplete: function () {
                            deferred.resolve();
                            $(this.oldContainer).remove();
                            console.log("fade-out");
                        }
                    });
                    return deferred.promise;
                },

                fadeIn: function () {
                    var _this = this;
                    var $el = $(this.newContainer);

                    TweenMax.set($(this.oldContainer), {display: "none"});
                    TweenMax.set($el, {
                        visibility: "visible",
                        opacity: 0
                    });

                    $(window).scrollTop(0);
                    $('.nav')
                        .first()
                        .addClass('active');

                    TweenMax.to($el, 0.3, {
                        opacity: 1,
                        onComplete: function () {
                            _this.done();
                            console.log("done");
                        }
                    });
                }
            });

        Barba.Pjax.getTransition = function () {
            return FadeTransition;
        };

        Barba
            .Dispatcher
            .on('newPageReady', function (currentStatus, prevStatus, container) {
                var prevPage = prevStatus.url;
                // console.log(prevPage);

                var prevPages = Barba.HistoryManager.history;

                for (i = 0; i < prevPages.length; i++) {
                    // prev = i - 2;
                    var pages = prevPages[prevPages.length - 2];
                    if (pages != undefined) {
                        var pageLink = pages.url;
                        console.log(pageLink);
                    }
                }
                // $('.summary').append("<a href='" + pageLink + "'>Back</a>");
                $('.back').attr('href', pageLink);
                // $('.back')     .on('click', function () {   Barba             .Pjax
                // .goTo(pageLink);     });

            });

        Barba
            .Prefetch
            .init();
        Barba
            .Pjax
            .start();
        Barba
            .Dispatcher
            .on('newPageReady', function () {

                function splitText(content, splitClass) {
                    let helloMessage = $(content);

                    let helloText = helloMessage.text();
                    helloMessage.text('');
                    let letters = helloText.split('');
                    for (i = 0; i < letters.length; i++) {
                        helloMessage.append('<span class="' + splitClass + '">' + letters[i] + '</span>')
                    }

                }
                // $('body').scrollTop(0); Ripple Effect on Cover Image
                $('.image')
                    .on('mouseover', function () {
                        $(this).ripples({resolution: 256, dropRadius: 20, perturbance: 0.03});
                    });

                // Scroll Magic Controller
                var controller = new ScrollMagic.Controller();

                $('.work').each(function (i) {
                    console.log('new page is ready');

                    //work navigation
                    let nav = $('.work-nav');
                    let navItem = $('.nav');

                    navNumber = i + 1;
                    navName = $('.nav')[0];
                    console.log(navItem);
                    // r.addClass('active');

                    goToDiv = $(this).attr('id');
                    nav.append('<li class="nav" data-go="' + goToDiv + '">' + goToDiv + '</li>');

                    var title = $(this).find('.title');

                    splitText(title, 'lo');

                    var cardAnimation = new TimelineMax({paused: true});
                    let workContainer = $(this);
                    let fxSlide = $(this).find('.fx');
                    let coverImage = $(this).find('.image');
                    let workTitle = $(this).find('.lo');
                    let role = $(this).find('.role');

                    cardAnimation.staggerFrom(workTitle, 0.15, {
                        y: 100,
                        ease: Power4.easeOut
                    }, 0.1).fromTo(fxSlide, .5, {
                        scaleY: .1,
                        scaleX: 0,
                        transformOrigin: 'bottom center'
                    }, {
                            scaleY: .1,
                            scaleX: 1,
                            transformOrigin: 'left bottom'
                        })
                        .to(fxSlide, 0.2, {
                        scaleY: 1,
                        transformOrigin: 'bottom center'
                    })
                        .add('fx')
                        .to(fxSlide, 0.2, {
                            scaleX: 0,
                            transformOrigin: 'right center',
                            delay: 0.1,
                            ease: Power3.easeOut
                        })
                        .from(coverImage, 0.2, {
                            scaleX: 0
                        }, 'fx')
                        .staggerFrom(role, 0.2, {
                            x: '-100%',
                            ease: Power3.easeOut
                        }, 0.1);

                    $('.nav').on('click', function () {
                        let goHere = '#' + $(this).attr('data-go');
                        $('.nav').removeClass('active');
                        $(this).addClass('active');
                        $('.work').removeClass('visible');
                        $(goHere).addClass('visible');
                        // console.log(goHere);
                        TweenLite.to(window, .5, {scrollTo: goHere});
                    });
                    $('.start').on('click', function () {
                        cardAnimation.play();
                        $('body').css("overflow", 'scroll');
                    });
                    if ($('.welcome').length <= 0) {
                        cardAnimation.play();
                        $('body').css("overflow", 'scroll');
                    } else {
                        $('body').css("overflow", 'hidden');
                    }
                    function getNavFrom(local) {
                        var trig = local.triggerElement();
                        var activeElement = trig.id;
                        console.log(trig);
                        $('.nav').removeClass('active');
                        // var navEl = $(".nav[data-go='" + activeElement + "']");
                        // navEl.toggleClass('active');

                        return activeElement;
                    }
                    var scene = new ScrollMagic
                        .Scene({triggerElement: this, reverse: true})
                        .setTween(cardAnimation) // trigger a TweenMax.to tween
                        .addTo(controller)
                        .on("enter", function () {
                            activeElement = getNavFrom(this);

                            var navEl = $(".nav[data-go='" + activeElement + "']");
                            navEl.toggleClass('active');
                            console.log(navEl);

                        })
                        .on("leave", function () {
                            activeElement = getNavFrom(this);

                            var navEl = $(".nav[data-go='" + activeElement + "']").prev('.nav');
                            navEl.toggleClass('active');
                            console.log(navEl);

                        });

                });

                // Make first Nav active $('.nav')     .first()     .addClass('active'); Scroll
                // magic scene for project images
                $('.project-image').each(function () {
                    var projScene = new ScrollMagic
                        .Scene({triggerElement: this, reverse: false})
                        .setClassToggle(this, 'slide-in')
                        .addTo(controller);
                });
            });
    });