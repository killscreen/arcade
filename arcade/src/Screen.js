/*global define*/

define(
    function () {
        
        function Screen(canvas, resolution) {
            var context = canvas.getContext('2d');

            resolution = resolution || [ 256, 256 ];
            resulution = Array.isArray(resolution) ? resolution : [ resolution, resolution ];

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


            return {

                draw: draw

            };

        }

    }
);
