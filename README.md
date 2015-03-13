# Starfield jQuery Plugin

A plugin to add a bitchin' starry background to your website. See an example at http://rocketwagonlabs.com.

## Documentation

To use, simply select a div element and call the .starfield() method.

### How to use

        $('#starfield-div').starfield();

### Options

Starfield has an options argument which you can use to customize its behavior:

* starDensity (default 1.0): Allows you to control how dense you want your starfield to be. Calculated based on pixel ratio. Increase for more stars, decrease for less.
* mouseScale (default 1.0): How quickly the starfield scrolls in response to mouse movement. Increase for faster movement, decrease for slower.
* seedMovement (default true): Start with a moving starfield on load. Also animates on non-mouse enabled devices.

        $('#starfield-div').starfield({
          starDensity: 2.0,
          mouseScale: 0.5,
          seedMovement: true
        });
           

## License / Credits

This plugin is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with the code.
[More Information](http://en.wikipedia.org/wiki/MIT_License)

Developed by [Luke Libraro](https://github.com/LukeL99) at [Rocket Wagon Labs](http://rocketwagonlabs.com) in Chicago, IL.

## Download

Releases are available for download from
[GitHub](https://github.com/popad/jquery-starfield).
