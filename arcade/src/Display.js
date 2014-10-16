/*global define*/

define(
    function () {
        "use strict";

        function Display(screen) {

            function render(display) {
                if (Array.isArray(display)) {
                    display.forEach(render);
                } else if (display.sprite) {
                    screen.draw(
                        display.sprite,
                        display.position,
                        display.palette
                    );
                } else if (display.line) {
                    screen.line(
                        display.line[0],
                        display.line[1],
                        display.palette,
                        display.color
                    );
                } else if (display.box) {
                    screen.box(
                        display.box[0],
                        display.box[1],
                        display.palette,
                        display.color
                    );
                } else if (display.text) {
                    screen.print(
                        display.text,
                        display.position,
                        display.height,
                        display.palette,
                        display.color
                    );
                }
            }

            return {
                update: function (state) {
                    screen.clear();
                    render(state.display || []);
                }
            };

        }

        return Display;

    }
);
