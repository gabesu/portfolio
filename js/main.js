//Split text

$(window)
    .on("load", function () {
        function splitText(content, splitClass) {
            let helloMessage = $(content);

            let helloText = helloMessage.text();
            helloMessage.text('');
            let letters = helloText.split('');
            for (i = 0; i < letters.length; i++) {
                helloMessage.append('<span class="' + splitClass + '">' + letters[i] + '</span>')
            }

        }
        splitText('#hello', 'oh');

        //Animation Timeline for Introduction Hello Slide
        TweenMax.staggerFrom('.oh', 3, {
            opacity: 0
        }, 0.1);
        TweenMax.from('.what', .5, {
            y: 10,
            opacity: 0,
            delay: 3
        });

        TweenMax.from('.start', .5, {
            opacity: 0,
            x: -10,
            delay: 3.5
        });

        $('.start').on('click', function () {
            console.log('something is about to happen right now');

            TweenMax.to(this, .1, {
                x: -20,
                opacity: 0
            });
            TweenMax.to('#hello', 1, {
                y: -50,
                opacity: 0
            });
            TweenMax.to('#what', 1, {
                y: 20,
                opacity: 0
            });
            TweenMax.to('.welcome', .5, {
                opacity: 0,
                delay: 1
            });

            setTimeout(function () {
                $('.welcome').remove();
            }, 1500);
        });

        // Side Nav links
        $('.nav').on('click', function () {
            let goHere = '#' + $(this).attr('data-go');
            $('.nav').removeClass('active');
            $(this).addClass('active');
            $('.work').removeClass('visible');
            $(goHere).addClass('visible');
            // console.log(goHere);
            TweenLite.to(window, .3, {scrollTo: goHere});
        });

    });
$('document').ready(function () {
    Barba.Pjax.cacheEnabled = true;
    Barba
        .Pjax
        .start({});
    Barba
        .Dispatcher
        .on('newPageReady', function () {
            console.log('ready');

        });

});