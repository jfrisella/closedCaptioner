/**
*   Closed Captioner
*/
(function($){

    //Nest inside function
    var _public = (function(){

        var _options = {},
            _private = {};
        var _defaults = {
            time: 0,
            data: NULL,
            render: function($el, sectionData){
                $el.html("<p class='cc-caption'>" + section.text + "</p>");
            }
        };


        //Private
        _private.currentBeginTime = NULL;
        _private.currentEndTime = NULL;

        /**
        *   Reset defaults
        */
        _private.reset = function(){
            _options = NULL;
            _options = {};
            _private.currentBeginTime = NULL;
            _private.currentEndTime = NULL;
        }

        /**
        *   Start everything
        *     - ajax or data
        */
        _private.start = function(){

        }

        /**
        *   Check current caption time
        */
        _private.checkTime = function(){

        }

        /**
        *   Get current caption section
        */
        _private.getSection = function(){

        }


        /**
        *   Public functions available through the jquery object
        */
        return {
            /**
            *   Main initialization
            */
            init: function(options){
                console.log("init");

                _private.reset();

                //extend defaults with options
                _options = {};
                $.extend(_options, _defaults, options);

                _private.start();
            },

            /**
            *   Update time in seconds
            */
            updateTime: function(seconds){
                _currentTime = seconds;

                _private.checkTime();
            }
        };

    }());


    /**
    *   Closed Captioner registration on jquery object
    *       - only routes options to closure methods above
    */
    $.fn.closedCaptioner = function (methodOrOptions) {
       if (_public[methodOrOptions]) {
           return _public[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
       } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
           // Default to "init"
           return _public.init.apply(this, arguments);
       } else {
           $.error('Method ' + methodOrOptions + ' does not exist on jQuery.closedCaptioner');
       }
    };

})(jQuery);
