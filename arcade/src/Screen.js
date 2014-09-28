/*global define*/

define(
    function () {
        
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
                palette = palette || [ undefined, 'white' ];                

                context.strokeStyle = palette[color || 1];
                context.lineWidth = (x(1) + y(1)) / 2;

                context.beginPath();
                context.moveTo(x(start[0]), x(start[1]));
                context.lineTo(y(end[0]), y(end[1]));
                context.stroke();
            }

            function draw(sprite, position, palette) {
                palette = palette || [ undefined, 'white' ];
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

            function clear() {
                context.clearRect(0, 0, dimensions[0], dimensions[1]);
            }
    
            resolution = resolution || [ 128, 128 ];
            resulution = Array.isArray(resolution) ? 
                resolution : [ resolution, resolution ];

            return {
                clear: clear,
                draw: draw,
                line: line
            };

        }

        return Screen;

    }
);
