//Color Code jQuery Plug-in
//Developed by Joseph Mallah - josephmallah.com
//Version 1.0 - 23 Jan 2015

(function($) {

    $.fn.colorCode = function( options ) {

        // Establish our default settings
        var settings = $.extend({
            colors        : ["green", "yellow", "red"],
            proportional  : true,
            clearContent  : false,
            useDataTag    : null
        }, options);

        //Extract the content of the Tags
        var numbers = [];
        $.each(this, function(index, value){
            var data_value = (settings.useDataTag === null ? $(this).html() : $(this).data(settings.useDataTag));
            if ( isInt( data_value ) ) {
                numbers.push(parseInt(data_value));
            } else {
                //If found a non numerical content Throw Error
                throw new Error('Expecting an Integer! Found: ' + $(this).html()); 
            }
        });

        //Remove any duplicates
        var numbers_unique = [];
        $.each(numbers, function(i, e) {
            if ($.inArray(e, numbers_unique) == -1) numbers_unique.push(e);
        });

        //Sort the array
        numbers_unique.sort(function(a, b){return a-b});

        if (numbers_unique.length == 0) {
            return this;
        }

        //Generate the corresponding color array
        var color_index_array = [];
        var heatmap = new Rainbow();
        heatmap.setSpectrumByArray(settings.colors);
        if (numbers_unique.length > 1) {
            if (settings.proportional) {
                var min = numbers_unique[0];
                var max = numbers_unique[numbers_unique.length - 1];
                var length = max - min;
                heatmap.setNumberRange(0, length);
                for (var i = min; i <= max; ++i) color_index_array.push(i);
            } else {
                heatmap.setNumberRange(0, numbers_unique.length - 1);
                color_index_array = numbers_unique;
            }
        } else {
            heatmap.setNumberRange(0, 1);
            color_index_array = numbers_unique;
        }

        return this.each( function() {
            var data_value = (settings.useDataTag === null ? $(this).html() : $(this).data(settings.useDataTag));
            //Get the color index of the number
            var color_index = $.inArray(parseInt(data_value), color_index_array);
            //In case of incorrect input default to black
            var color = "black";
            //If the input color array is equal to the number of tags and the proportional 
            //option is off assign directly the color without the rainbow
            if (settings.proportional == false && settings.colors.length == numbers_unique.length) {
                color = settings.colors[color_index];
            } else {
                color = "#"+heatmap.colourAt(color_index);
            }

            $(this).css({
                "background-color" : color
            });

            //Check if should clear the content of the Tag
            if (settings.clearContent) {
                $(this).html("");
            }
        });

    }

}(jQuery));


function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}