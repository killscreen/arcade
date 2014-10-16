/*global define*/

define(
    function () {
        "use strict";
        
        var PALETTE = [ undefined, 'white' ];
        
        function Screen(canvas, resolution) {
            var context = canvas.getContext('2d'),
                dimensions = [ canvas.width, canvas.height ];

            function x(u) {
                return u * dimensions[0] / resolution[0];
            }

            function y(v) {
                return v * dimensions[1] / resolution[1];
            }

            function line(start, end, palette, color) {
                color = color !== undefined ? color : 1;
                palette = palette || PALETTE;

                context.strokeStyle = palette[color];
                context.lineWidth = (x(1) + y(1)) / 2;

                context.beginPath();
                context.moveTo(x(start[0]), x(start[1]));
                context.lineTo(y(end[0]), y(end[1]));
                context.stroke();
            }

            function draw(sprite, position, palette) {
                palette = palette || PALETTE;
                position = position || [ 0, 0 ];

                sprite.forEach(function (row, v) {
                    row.forEach(function (pixel, u) {
                        var c = palette[pixel ? 1 : 0];
                        if (c) { // Nothing to draw here
                            context.fillStyle = c;
                            context.fillRect(
                                x(u + position[0]),
                                y(v + position[1]),
                                x(1),
                                y(1)
                            );
                        }

                    });
                });
            }
            
            function print(text, position, height, palette, color) {
                palette = palette || PALETTE;

                context.font = y(height || 8) + 'px monospace';
                context.textAlign = 'middle';
                
                context.fillStyle = palette[color || 1];
                
                context.fillText(text, x(position[0]), y(position[1]));
            }

            function clear() {
                context.clearRect(0, 0, dimensions[0], dimensions[1]);
            }
    
            resolution = resolution || [ 128, 128 ];
            resolution = Array.isArray(resolution) ?
                    resolution : [ resolution, resolution ];

            return {
                clear: clear,
                draw: draw,
                line: line,
                print: print
            };

        }

        return Screen;

    }
);
