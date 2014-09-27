/*global define*/

define(
    function () {
        
        function Screen(canvas, resolution) {
            var context = canvas.getContext('2d'),
                dimensions = [ canvas.width, canvas.height ];

            function line(start, end, color, palette) {
                palette = palette || [ undefined, 'white' ];                
                color = palette[color];

                

                context.beginPath();
                context.moveTo(start[0], start[1]);
                context.lineTo(end[0], end[1]);
                context.closePath();
            }

            function draw(sprite, position, palette) {
                palette = palette || [ undefined, 'white' ];
                position = position || [ 0, 0 ];

                sprite.forEach(function (row, u) {
                    row.forEach(function (pixel, v) {
                        var c = palette[pixel ? 0 : 1];
                        if (!c) return; // Nothing to draw here

                    });
                });
            }

            function clear() {
                context.clearRect(0, 0, resolution[0], resolution[1]);
            }
    
            resolution = resolution || [ 256, 256 ];
            resulution = Array.isArray(resolution) ? 
                resolution : [ resolution, resolution ];

            return {
                clear: clear,
                draw: draw
            };

        }

        return Screen;

    }
);
