ColorCode-JS
=============

A jQuery plug-in plug-in that transform numerical tags into color scale. The advantage of color coding is to facilitate the visualization of the data and provide an instant understanding of the values.

The basic usage of *Color Code* is to parse specific **div** (or any other tag) and color their background using a color gradient depending on the contained value inside the div.

See the provided index.html for detailed examples and documentation

##Requirements
*Color code* require the [jQuery library](http://jquery.com/download/") version 1.9 and up. In addition to the jQuery library, *color code* requires the [rainbowvis](https://github.com/anomal/RainbowVis-JS) plug-in to generate the color gradients.

##Usage
To use the plug-in simply call the plug-in on your elements. The value parsed should be an *INTEGER* otherwise the plug-in will throw an error.
```
$("your_elements").colorCode();
```
To specify more settings, pass them to the function in the options parameter:
```
$("your_elements").colorCode({
	colors        : ["green", "yellow", "red"],
    proportional  : true,
    clearContent  : false,
    useDataTag    : null
});
```
##Options
- clearContent: [boolean] clear the content of the **div**. *Default: false*
- colors: [array] the colors of the gradient. *Default: ["green", "yellow", "red"]*
- proportional: [boolean] colors are proportional to the value. *Default: true*
- useDataTag: [string] the name of the data attribute to read the value from. If **null** reads the content of the HTML Tag. *Default: null*

##License Agreement
This content is released under the [MIT License](http://opensource.org/licenses/mit-license.html)

##Acknowledgments
Developed and maintained by Joseph Mallah @ [josephmallah.com](http://josephmallah.com)