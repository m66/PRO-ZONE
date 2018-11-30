var lat , lng;
var markers_map=[];

document.addEventListener('DOMContentLoaded', function(){
    var script = document.createElement("script"); // Make a script DOM node
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgBguauBbdzlK4pWUAHbz8N6ThpXFKHJE&sensor=false&sensor=false&v=3&libraries=places&callback=initMap"; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    lat = 36.1924392;
    lng = -115.3066936;
});

function initMap() {
    var center = {lat:parseFloat(lat), lng:parseFloat(lng)};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: center
    });
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
}

$(function () {

    $(window).on('scroll', function () {
        var scrollPosition = $(window).height() + $(window).scrollTop();
        console.log(scrollPosition);

        if(scrollPosition > 1300) {
            if(!$('.header').hasClass('scroll-down')){
                $('.header').addClass('scroll-down');
            }
        }else{
            if($('.header').hasClass('scroll-down')){
                $('.header').removeClass('scroll-down');
            }
        }

        if(scrollPosition > 3850 && !$('.count-down').hasClass('counted')){
            $('.count-down').addClass('counted');
            $.fn.countTo = function (options) {
                options = options || {};

                return $(this).each(function () {
                    // set options for current element
                    var settings = $.extend({}, $.fn.countTo.defaults, {
                        from:            $(this).data('from'),
                        to:              $(this).data('to'),
                        speed:           $(this).data('speed'),
                        refreshInterval: $(this).data('refresh-interval'),
                        decimals:        $(this).data('decimals')
                    }, options);

                    // how many times to update the value, and how much to increment the value on each update
                    var loops = Math.ceil(settings.speed / settings.refreshInterval),
                        increment = (settings.to - settings.from) / loops;

                    // references & variables that will change with each update
                    var self = this,
                        $self = $(this),
                        loopCount = 0,
                        value = settings.from,
                        data = $self.data('countTo') || {};

                    $self.data('countTo', data);

                    // if an existing interval can be found, clear it first
                    if (data.interval) {
                        clearInterval(data.interval);
                    }
                    data.interval = setInterval(updateTimer, settings.refreshInterval);

                    // initialize the element with the starting value
                    render(value);

                    function updateTimer() {
                        value += increment;
                        loopCount++;

                        render(value);

                        if (typeof(settings.onUpdate) == 'function') {
                            settings.onUpdate.call(self, value);
                        }

                        if (loopCount >= loops) {
                            // remove the interval
                            $self.removeData('countTo');
                            clearInterval(data.interval);
                            value = settings.to;

                            if (typeof(settings.onComplete) == 'function') {
                                settings.onComplete.call(self, value);
                            }
                        }
                    }

                    function render(value) {
                        var formattedValue = settings.formatter.call(self, value, settings);
                        $self.html(formattedValue+"+");
                    }
                });
            };

            $.fn.countTo.defaults = {
                from: 0,               // the number the element should start at
                to: 0,                 // the number the element should end at
                speed: 1000,           // how long it should take to count between the target numbers
                refreshInterval: 100,  // how often the element should be updated
                decimals: 0,           // the number of decimal places to show
                formatter: formatter,  // handler for formatting the value before rendering
                onUpdate: null,        // callback method for every time the element is updated
                onComplete: null       // callback method for when the element finishes updating
            };

            function formatter(value, settings) {
                return value.toFixed(settings.decimals);
            }
            // custom formatting example
            $('.count-number').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });

            // start all the timers
            $('.timer').each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
        }

        if(scrollPosition > 980) {
            if(!$('.progress-bar-box').hasClass('progress-animated')){
                $('.progress-bar-box').addClass('progress-animated');
                var progres_bar_animations = $('.progress-bar .progress-bar-animation');
                for (var i =0; i < progres_bar_animations.length; i++){
                    var data_count = progres_bar_animations[i].dataset.progressAnimation;
                    progres_bar_animations[i].style.width = data_count+'%';
                    console.log(data_count);
                }
            }

        }
    });
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
    $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
    if($(document).width() <= 992) {
        var navbar_dark = $('.navbar-light');
        navbar_dark.removeClass('navbar-light');
        navbar_dark.addClass('navbar-dark');
        var navbar = $('nav.navbar div#navbarSupportedContent').remove();
        console.log(navbar);
        $('.navigation').append(navbar);
    }
    if($(document).width() <= 576) {
        $('.search input').on('focus', function () {
            $(this).closest('.social_search_center').find('.col-7').css('display', 'none');
            $(this).closest('.col-5').removeClass('col-5').addClass('col-12');
            $(this).closest('.search').css('width', '100%');
        })

        $('.search input').on('blur', function () {
            $(this).closest('.col-12').addClass('col-5').removeClass('col-12');
            $(this).closest('.search').addClass('float-right');
            $(this).closest('.social_search_center').find('.col-7').css('display', 'block');
        })
    }
    $('nav .navbar-toggler').on('click', function () {
        if($('#navbarSupportedContent').hasClass('open')){
            $('#navbarSupportedContent').removeClass('open')
        }else {
            $('#navbarSupportedContent').addClass('open');
        }
    });
    $('button.navbar-toggler').on('click', function(){
        if($('.navbar-collapse').hasClass('open')) {
            $(this).closest('.navbar').css('position', 'fixed');
        }else {
            $(this).closest('.navbar').css('position', 'absolute');
        }
    });

});