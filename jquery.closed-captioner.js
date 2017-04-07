/**
*   Closed Captioner
*/
(function($){

    //Nest inside function
    var _public = (function(){

        var _options = {},
            _private = {};
        var _defaults = {

            //in milliseconds
            time: 0,

            //json object
            data: null,

            //adds captions to dom
            render: function($el, sectionData){
                console.log("options.render");
                console.log(sectionData);
                if(!sectionData){
                    $el.html("");
                }else{
                    console.log($el);
                    $el.html("<p class='cc-caption'>" + sectionData.text + "</p>");
                }
            }
        };


        /**
        *   Section is one of the individual json objects
        *   when it is set, we use the beginTime and endTime on the object
        *   to determine display.  When null, we search for the next one.
        */
        _private.section = null;
        _private.sectionChange = 0;
        _private.$el = null;

        /**
        *   Reset defaults
        */
        _private.reset = function(){
            _options = null;
            _options = {};
            _private.section = null;
            _private.$el = null;
        }

        /**
        *   Check current caption time
        */
        _private.checkTime = function(){
            console.log("checkTime");
            if(!_private.section || (_options.time < _private.section.begin || _options.time >= _private.section.end) ){
                //Need to find the next section if there is one
                _private.section = _private.getSection();
                _private.sectionChange = 1;
            }
            //if time is in section, then nothing has changed
            else if(_options.time >= _private.section.begin && _options.time < _private.section.end){
                _private.sectionChange = 0;
            }

            _private.render();
        }

        /**
        *   Determine whether to render caption or not
        *   based on sectionChange
        */
        _private.render = function(){
            console.log("render");
            if(_private.sectionChange !== 1) return;
            _private.sectionChange = 0;
            _options.render(_private.$el, _private.section);
        }

        /**
        *   Get current caption section
        */
        _private.getSection = function(){
            console.log("getSection");
            for(var i = 0; i < _options.data.length; i+=1){
                if(_options.time >= _options.data[i].begin && _options.time < _options.data[i].end){
                    return _options.data[i];
                }
            }
            return null;
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

                //set element
                _private.$el = $(this);

                //extend defaults with options
                _options = {};
                $.extend(_options, _defaults, options);

                //Do some data checks
                if(!_options.data || typeof _options.data !== "object" || _options.data.length === 0){
                  $.error("init : data : caption data is required");
                  return false;
                }

                _private.checkTime();
            },

            /**
            *   Update time in milliseconds
            */
            updateTime: function(ms){
                console.log("updateTime");
                console.log(ms);
                _options.time = ms;
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
