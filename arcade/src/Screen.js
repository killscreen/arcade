/*global define*/

define(
    function () {
        
        function Screen(canvas, resolution) {
            var context = canvas.getContext('2d');

            function draw(sprite, position, palette) {
                var palette = palette || [ undefined, 'white' ];

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
            resulution = Array.isArray(resolution) ? resolution : [ resolution, resolution ];

            canvas.style['background-color'] = 'black';
            canvas.width = resolution[0];
            canvas.height = resolution[1];

            return {
                clear: clear,
                draw: draw
            };

        }

        return Screen;

    }
);
